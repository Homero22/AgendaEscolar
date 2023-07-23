package com.example.logica

import com.example.data.models.Homework
import com.example.data.models.Note
import com.example.data.repositories.Homeworks
import com.example.data.repositories.Notes
import com.example.data.repositories.cGenerica
import com.github.kittinunf.fuel.Fuel
import com.github.kittinunf.fuel.core.extensions.jsonBody
import kotlinx.coroutines.delay
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import java.time.LocalDate
import java.time.LocalTime
import java.util.*
import kotlin.concurrent.schedule




class NotificacionesLogic {
    val obj = cGenerica<Notes>()
    val objH= cGenerica<Homeworks>()
    fun Notificaciones(){
        fun enviarWhatsappN(numeroNacional: String, mensajeWpp: String, id: Int) {
            val url = "http://localhost:3001/lead"
            val parametros = Lead(numeroNacional, mensajeWpp)
            val jsonParametros = Json.encodeToString(parametros) // Convertir los parámetros a JSON
            Fuel.post(url)
                .jsonBody(jsonParametros)
                .response { request, response, result ->
                    if (response.statusCode == 200) {
                        println("Mensaje enviado")
                    } else {
                        println("Error al enviar mensaje")
                    }
                }
        }
        fun enviarWhatsappH(numeroNacional: String, mensajeWpp: String, id: Int) {
            val url = "http://localhost:3001/lead"
            val parametros = Lead(numeroNacional, mensajeWpp)
//creame un array vacio para guardar el id
            val jsonParametros = Json.encodeToString(parametros) // Convertir los parámetros a JSON
//comprobar que el id no este en el array

            Fuel.post(url)
                .jsonBody(jsonParametros)
                .response { request, response, result ->
// Comprobar el resultado de la respuesta de la API
                    if (response.statusCode == 200) {
                        println("Mensaje enviado")

                    } else {
                        println("Error al enviar mensaje")
                    }
                }
        }

        fun enviarApunte(tareaRecordatorio: String, idUser: Long, id: Int, titulo: String, resumen: String) {
            val numero = obj.gGetNumeroN(Notes,idUser)
            val numeroSinCero = numero?.substring(1)
            val numeroNacional = "593$numeroSinCero"

            val nombreUsuario = obj.gGetNombreN(Notes,idUser, id)
            val emoji = "\uD83D\uDC4B"
            val mensajeWpp =
                "Hola $nombreUsuario $emoji,\nClassBuddy te manda el apunte que generaste. \nSu título es: $titulo. \nEl resumen es: $resumen"
            enviarWhatsappN(numeroNacional, mensajeWpp, id)
        }

        fun enviarDeber(tareaRecordatorio: String, idUser: Long, id: Int) {

            val numero = objH.gGetNumero(Homeworks,idUser)
            val numeroSinCero = numero?.substring(1)
            val numeroNacional = "593$numeroSinCero"
            val emoji = "\uD83D\uDC4B"
            val tituloTarea = objH.gGetTituloTarea(Homeworks,idUser,id)
            val nombreUsuario = objH.gGetNombre(Homeworks,idUser, id)
            val horaEntrega = objH.gGetHoraEntrega(Homeworks,idUser, id)
            val mensajeWpp =
                "Hola $nombreUsuario $emoji \nClassBuddy te recuerda que:\nLa tarea: $tituloTarea se debe entregar a las: $horaEntrega h.\n¡Te deseamos un buen día! \uD83E\uDD13 "


            enviarWhatsappH(numeroNacional, mensajeWpp, id)
        }
        fun compararFechasN(notas: List<Note>) {
            val horaActual = LocalTime.now()
            println("entra a la funcion comparar fechas")
            for (nota in notas){
                if (LocalTime.parse(nota.apunteRecordatorio) == LocalTime.of(horaActual.hour, horaActual.minute)) {
                    enviarApunte(nota.apunteRecordatorio, nota.idUser, nota.id, nota.apunteTitulo, nota.apunteResumen)
                }
            }
        }
        fun compararFechasH(tareas: List<Homework>) {
            val fechaActual = LocalDate.now()
            val horaActual = LocalTime.now()
            println("entra a la funcion comparar fechas")
            for (tarea in tareas){
                if (LocalDate.parse(tarea.fechaFin) <= fechaActual && LocalTime.parse(tarea.tareaRecordatorio) == LocalTime.of(horaActual.hour, horaActual.minute)) {
                    enviarDeber(tarea.tareaRecordatorio, tarea.idUser, tarea.id)
                }
            }
        }
        fun principalNoti() {
            val timer = Timer()
            val intervalo = 59000L // Intervalo de 1 minuto en milisegundos
            timer.schedule(0L, intervalo) {
                val notas = obj.gGetAllNotes(Notes)
                val tareas = objH.gGetTareas(Homeworks,"PENDIENTE")

                if (notas.isNotEmpty()||tareas.isNotEmpty()){
                    compararFechasN(notas)
                    compararFechasH(tareas)
                }else{
                    println("No hay tareas pendientes")
                }
            }
// Mantenemos el programa en ejecución
            runBlocking {
                delay(Long.MAX_VALUE)
            }
        }
        principalNoti()
    }
    @Serializable
    data class Lead(val phone: String, val message: String)
}