package com.example.routes

import com.example.data.models.Homework
import com.example.data.repositories.Homeworks
import com.example.logica.HomeworksLogic
import com.example.utils.Response
import com.example.utils.ResponseEmpty
import com.example.utils.ResponseSingle
import com.example.utils.sendJsonResponse
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
                if(res!=null){
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
                val res = HomeworksLogic().save(homework);
                if(res!=null){
                    val response = ResponseSingle(true,"Tarea guardada correctamente", res)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = ResponseSingle(false,"No se guardo tarea", res)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }
            }catch (cause: Throwable){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }

        get ( "/{id}" ){
            //Obtener el id de la tarea a buscar
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            try{
                //envio capa logica
                val response = HomeworksLogic().getById(id);

                if (response != null){
                    val response = ResponseSingle(true,"Tarea obtenida correctamente", response)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = ResponseSingle(false,"No se encontro tarea", response)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }
            }catch (cause: Throwable){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }

        get ("/user/{id}") {
            //Obtener el id del usuario a buscar
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            try{
                //Envio a la capa logica
                val res = HomeworksLogic().getByUserId(id);
                if(res==null){
                    val response = Response(false,"No se encontro tarea", emptyList())
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = ResponseSingle(true,"Tarea obtenida correctamente", res)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }
            }catch (cause: Throwable){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }

        put("/{id}") {
            //Obtener el id de la tarea a actualizar
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            //Obtener los datos de la tarea a actualizar
            val homework = call.receive<Homework>()
            //Actualizar la tarea
            try {
                //envio capa logica
                val homework = HomeworksLogic().update(id, homework);
                if (homework != null){
                   val response = ResponseSingle(true,"Tarea actualizada correctamente", homework)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = ResponseEmpty(false,"No se encontro tarea", emptyList())
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }
            }catch ( cause: Throwable){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }

        delete("/{id}") {
            //Obtener el id de la tarea a eliminar
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            //Eliminar la tarea
            try {
                // envio capa logica
                val homework = HomeworksLogic().delete(id);
                if (homework != null){
                    val response = Homeworks.delete(id)
                    call.respond(HttpStatusCode(200, "OK"), response)
                }else{
                    call.respond(HttpStatusCode.NotFound, "Tarea no encontrada")
                }
            }catch ( cause: Throwable){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }

        //obtener tareas pendientes o finalizadas
        get ("/estado/{id}"){
            //Obtener el id del usuario a buscar
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            //Obtener el estado de la tarea a buscar
            val estado = call.parameters["estado"]?.toIntOrNull() ?: 0
            try{
                //Envio a la capa logica
                val res = HomeworksLogic().getByEstado(id, estado);
                if(res==0){
                    val response = Response(false,"No se encontro tarea", emptyList())
                    sendJsonResponse(call, HttpStatusCode.OK, response)
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