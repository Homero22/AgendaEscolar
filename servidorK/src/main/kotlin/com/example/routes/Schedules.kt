package com.example.routes

import com.example.data.models.Schedule
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
                val limit = call.parameters["limit"]?.toIntOrNull() ?: 10
                val offset = call.parameters["offset"]?.toIntOrNull() ?: 0
                val res = ScheduleLogic().getAll(limit, offset);
                if(res.isNotEmpty()){
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
            //GET /schedules/{id}
            //Aquí recibimos el id del usuario para obtener todos los horarios
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            try {
                val res = ScheduleLogic().getByUserId(id)
               if(res.isEmpty()){
                   val response = ResponseSingle(false,"No se encontró horario", res)
                     sendJsonResponse(call, HttpStatusCode.OK, response)
               }else{
                   val response = ResponseSingle(true,"Horario obtenido correctamente", res)
                   sendJsonResponse(call, HttpStatusCode.OK, response)
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
                val id = call.parameters["id"]?.toIntOrNull() ?: 0

                val schedule = call.receive<Schedule>()
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

            //Obtenemos el id del horario a eliminar
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