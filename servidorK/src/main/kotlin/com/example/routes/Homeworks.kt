package com.example.routes

import com.example.data.models.Homework
import com.example.data.repositories.Homeworks
import com.example.logica.HomeworksLogic
import com.example.utils.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.homeworksRouting(){
    route("/homeworks") {
        get {
            try {
                //Obtener el límite de tareas a mostrar
                val limit = call.parameters["limit"]?.toIntOrNull() ?: 10
                //Obtener el offset de tareas a mostrar
                val offset = call.parameters["offset"]?.toIntOrNull() ?: 0
                //envio capa logica
                val res = HomeworksLogic().getAll(limit, offset);
                if(res.isNotEmpty()){
                    val response = Response(true,"Tareas obtenidas correctamente", res)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = Response(false,"No se encontraron tareas", res)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }
            }catch (cause: Throwable){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }

        }
        post {
            //Obtener los datos de la tarea a guardar
            val homework = call.receive<Homework>()
            try{
                //Envio a la capa logica
                when (val res = HomeworksLogic().save(homework)) {
                    1 -> {
                        val response = ResponseSingle(true,"Tarea guardada correctamente", res)
                        sendJsonResponse(call, HttpStatusCode.OK, response)
                    }
                    0 -> {
                        val response = ResponseSingle(false,"Existe una tarea con el mismo nombre ", res)
                        sendJsonResponse(call, HttpStatusCode.OK, response)
                    }
                    else -> {
                        val response = ResponseSingle(false,"No se pudo guardar la tarea", res)
                        sendJsonResponse(call, HttpStatusCode.OK, response)
                    }
                }
            }catch (cause: Throwable){
                val response = ResponseSimple(false, "Verifique que los datos sean correctos")
                sendJsonResponse(call, HttpStatusCode.BadRequest, response)
            }
        }
        get ( "/{id}" ){
            //Obtener el id de la tarea a buscar
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            try{
                val response = HomeworksLogic().getById(id);
                if (response == 0){
                    val res = ResponseSimple(false,"No se encontró la tarea")
                    sendJsonResponse(call, HttpStatusCode.NotFound, res)
                }else{
                    val res = ResponseSingle(true,"Tarea obtenida correctamente", response)
                    sendJsonResponse(call, HttpStatusCode.OK, res)
                }
            }catch (cause: Throwable){
                call.respond(HttpStatusCode.BadRequest,  "Error desconocido. Verifique los datos")
            }
        }
        get ("/user/{id}") {
            //Obtener el id del usuario a buscar
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            try{
                val res = HomeworksLogic().getByUserId(id)
                if(res.isEmpty()){
                    val response = Response(false,"No se encontraron las tareas", emptyList())
                    sendJsonResponse(call, HttpStatusCode.NotFound, response)
                }else{
                    val response = ResponseSingle(true,"Tareas obtenidas correctamente", res)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }
            }catch (cause: Throwable){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
        put("/{id}") {
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            val homework = call.receive<Homework>()
            try {
                val res = HomeworksLogic().update(id, homework);
                if (res == 1){
                   val response = ResponseSingle(true,"Tarea actualizada correctamente", res)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = ResponseEmpty(false,"No se encontró la tarea", emptyList())
                    sendJsonResponse(call, HttpStatusCode.NotFound, response)
                }
            }catch ( cause: Throwable){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
        delete("/{id}") {
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            try {
                val homework = HomeworksLogic().delete(id);
                if(homework == 1){
                    val response = ResponseSingle(true,"Tarea eliminada correctamente", homework)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = ResponseSingle(false,"No se encontró la  tarea", homework)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }
            }catch ( cause: Throwable){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
        //obtener tareas pendientes o finalizadas
        get ("/estado/{id}"){
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            val estado = call.parameters["estado"]?.toIntOrNull() ?: 0
            try{
                //Envio a la capa logica
                val res = HomeworksLogic().getByEstado(id, estado);
                if(res==0){
                    val response = Response(false,"No se encontró la  tarea", emptyList())
                    sendJsonResponse(call, HttpStatusCode.NotFound, response)
                }else{
                    val response = ResponseSingle(true,"Tarea obtenida correctamente", res)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }
            }catch (cause: Throwable){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }

        }
    }
}