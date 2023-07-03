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
import com.github.kittinunf.result.*


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
    fun enviarWhatsapp(numeroNacional: String, mensajeWpp: String) {
        val url = "http://localhost:3002/lead"
        val parametros = listOf("phone" to numeroNacional, "text" to mensajeWpp)

        Fuel.post(url, parametros)
            .responseString { request, response, result ->
                when (result) {
                    is Result.Success -> {
                        val (datos, error) = result
                        println("Mensaje enviado exitosamente")
                        println(datos)
                    }
                    is Result.Failure -> {
                        val (datos, error) = result
                        println("Error al enviar el mensaje: $error")
                    }
                }
            }
    }

    fun notificaciones(){
        fun enviarNotificacion(tareaRecordatorio: String, idUser: Long) {
            //comprobar que hora recordatorio sea igual a la hora actual
            println("llega a la funcion enviar notificacion con EXITOOO PAPAAAA")

            println("Enviando notificación a $idUser")
            println("Tarea: $tareaRecordatorio")
            //consulta el numero del usuario
            val numero = obj.gGetNumero(Homeworks,idUser)
            val numeroNacional = "+593$numero"
            val tituloTarea = obj.gGetTituloTarea(Homeworks,idUser)
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
            for (tarea in tareas){
                println("FECHAFIN")
                println(LocalDate.parse(tarea.fechaFin))
                println("FECHAACTUAL")
                println(fechaActual)
                println("HORAACTUAL")
                println(LocalTime.of(horaActual.hour, horaActual.minute))
                println(tarea.horaEntrega)
                println("recordatorio")
                println(LocalTime.parse(tarea.tareaRecordatorio))

                if (LocalDate.parse(tarea.fechaFin) >= fechaActual && LocalTime.parse(tarea.tareaRecordatorio) == LocalTime.of(horaActual.hour, horaActual.minute)) {
                    println("ENTRA AL IF")
                    enviarNotificacion(tarea.tareaRecordatorio, tarea.idUser)
                }
            }
        }
        fun principalNotificaciones() {
            println("llega a la funcion principal notificaciones")
            val tareas = obj.gGetTareas(Homeworks,4,"PENDIENTE")
            val timer = Timer()
            val intervalo = 35000L // Intervalo de 1 minuto en milisegundos

            timer.schedule(0L, intervalo) {
                GlobalScope.launch {
                    compararFechas(tareas)
                }
            }
            // Mantenemos el programa en ejecución
            runBlocking {
                delay(Long.MAX_VALUE)
            }
        }
        println("llego a la funcion notificaciones")
        principalNotificaciones()

    }




}