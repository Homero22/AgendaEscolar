package com.example.logica

import com.example.data.models.Homework
import com.example.data.repositories.Homeworks
import com.example.data.repositories.cGenerica
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import java.time.LocalDate
import java.time.LocalTime
import java.util.*
import kotlin.concurrent.schedule
import com.github.kittinunf.fuel.*
import com.github.kittinunf.fuel.core.*
import com.github.kittinunf.fuel.core.extensions.jsonBody
import com.github.kittinunf.result.*
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json


class HomeworksLogic {
    val obj = cGenerica<Homeworks>()

    fun createHomework(objeto: Any): Any {
        return obj.gSave(Homeworks,objeto)
    }

    fun getAll(limit: Int, offset: Int): List<Any> {
        return obj.gGetAll(Homeworks,limit,offset)
    }

    fun updateHomework(id: Int, homework: Any): Any {
        return obj.gUpdate(Homeworks,id,homework)
    }

    fun deleteHomework(id: Int): Any {
        val respuesta = obj.gGgetById(Homeworks,id)
        if (respuesta != null) {
            obj.gDelete(Homeworks,id)
            return 1
        }
        return 0
    }


    fun getById(id: Int): Any {
        return obj.gGgetById(Homeworks,id) ?: return 0
    }


    fun getByUserId(id: Int): Any? {
        return obj.gGetByUserId(Homeworks,id)
    }

    fun save(homework: Homework): Any {
        return obj.gSave(Homeworks,homework)
    }

    fun update(id: Int, homework: Homework): Any {
        return obj.gUpdate(Homeworks,id,homework)
    }

    fun delete(id: Int): Any {
        val respuesta = obj.gGgetById(Homeworks,id)

        if (respuesta != null) {
            obj.gDelete(Homeworks,id)
            return 1
        }
        return 0
    }

    fun getByEstado(id: Int, estado: Int): Any {
        when (estado) {
            0 -> return obj.gGetByEstado(Homeworks, id, "FINALIZADO")
            1 -> return obj.gGetByEstado(Homeworks, id, "PENDIENTE")
        }
        return 0
    }


    fun notificaciones(){
       fun enviarWhatsapp(numeroNacional: String, mensajeWpp: String) {
            val url = "http://localhost:3002/lead"
            val parametros = Lead(numeroNacional,mensajeWpp)
           val jsonParametros = Json.encodeToString(parametros) // Convertir los parámetros a JSON
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
        fun enviarNotificacion(tareaRecordatorio: String, idUser: Long) {
            //comprobar que hora recordatorio sea igual a la hora actual
            println("Enviando notificación a $idUser")
            println("Tarea: $tareaRecordatorio")
            //consulta el numero del usuario
            val numero = obj.gGetNumero(Homeworks,idUser.toLong())
            println("NUMEROOOOOOOOOO")
            println(numero)

            //elimina el 0 del numero
            val numeroSinCero = numero?.substring(1)
            val numeroNacional = "593$numeroSinCero"
            val tituloTarea = obj.gGetTituloTarea(Homeworks,idUser.toLong())
            val nombreUsuario = obj.gGetNombre(Homeworks,idUser)
            val horaEntrega = obj.gGetHoraEntrega(Homeworks,idUser)
            val mensajeWpp = "Hola, " + nombreUsuario + ", ClassBuddy te saluda. La tarea: "+ tituloTarea + " se debe entregar a las: " + horaEntrega + ". Te deseamos un buen día. :)"
            println("NUMERO NACIONAL")
            println(mensajeWpp)
            println(numeroNacional)
            enviarWhatsapp(numeroNacional, mensajeWpp)
        }
        fun compararFechas(tareas: List<Homework>) {
            val fechaActual = LocalDate.now()
            val horaActual = LocalTime.now()
            println("entra a la funcion comparar fechas")
            for (tarea in tareas){

                if (LocalDate.parse(tarea.fechaFin) <= fechaActual && LocalTime.parse(tarea.tareaRecordatorio) == LocalTime.of(horaActual.hour, horaActual.minute)) {
                    println("TAREA RECORDATORIO")
                    println(tarea.tareaRecordatorio)
                    enviarNotificacion(tarea.tareaRecordatorio, tarea.idUser)
                    println("Entra al if de comparar fechas")
                }
            }
        }
        fun principalNotificaciones() {
            println("llega a la funcion principal notificaciones")
            val timer = Timer()
            val intervalo = 10000L // Intervalo de 1 minuto en milisegundos
            timer.schedule(0L, intervalo) {
                GlobalScope.launch {
                    val tareas = obj.gGetTareas(Homeworks,4,"PENDIENTE")
                    compararFechas(tareas)
                }
            }
            // Mantenemos el programa en ejecución
            runBlocking {
                delay(Long.MAX_VALUE)
            }
        }
        principalNotificaciones()
    }

}
@Serializable
data class Lead(val phone: String, val message: String)