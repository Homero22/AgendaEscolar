package com.example.routes

import com.example.data.models.Schedule
import com.example.data.repositories.Schedules
import com.example.logica.ScheduleLogic
import com.example.utils.Response
import com.example.utils.ResponseSingle
import com.example.utils.sendJsonResponse
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*


fun Route.horariosRouting() {
    route("/schedules") {
        get {
            //GET /schedules
            try {
                //Envio a la capa logica
                val res = ScheduleLogic().getAll();
                if(res!=null){
                    val response = Response(true,"Horarios obtenidos correctamente", res)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = Response(false,"No se encontraron horarios", res)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }
            }catch (
                cause: Throwable
            ){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
        get("/{id}") {

            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            try {
                //Obtenemos el pais
                val schedule = Schedules.getById(id)
                if (schedule != null) {
                    call.respond(HttpStatusCode.OK, schedule)
                } else {
                    call.respond(HttpStatusCode.NotFound, "Horario no encontrado")
                }
            }catch (
                cause: Throwable
            ){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
        post {
            //POST /countries
            //Obtenemos el pais a guardar
            val schedule = call.receive<Schedule>()
            try {
               //envio capa logica
                val res = ScheduleLogic().crearHorario(schedule)
                if(res==1) {
                    val response = ResponseSingle(true, "Horario creado correctamente", schedule)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = ResponseSingle(false, "No se pudo crear el horario", schedule)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }
            }catch (
                cause: Throwable
            ){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
        put("/{id}") {


            try {
                //PUT /countries/{id}
                //Obtenemos el id del pais a actualizar
                val id = call.parameters["id"]?.toIntOrNull() ?: 0
                //Obtenemos el pais a actualizar
                val schedule = call.receive<Any>()
                //envio capa logica
                val res = ScheduleLogic().actualizarHorario(id,schedule)
                if(res==1) {
                    val response = ResponseSingle(true, "Horario actualizado correctamente", schedule)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = ResponseSingle(false, "No se pudo actualizar el horario", schedule)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }
            }catch (
                cause: Throwable
            ){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
        delete("/{id}") {

            //Obtenemos el id del pais a eliminar
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            try {
                //envio capa logica
                val res = ScheduleLogic().eliminarHorario(id)
                if(res==1) {
                    val response = ResponseSingle(true, "Horario eliminado correctamente", id)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = ResponseSingle(false, "No se pudo eliminar el horario", id)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }
            }catch (
                cause: Throwable
            ){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }

    }
}