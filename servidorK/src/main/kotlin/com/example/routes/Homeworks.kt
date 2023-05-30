package com.example.routes

import com.example.data.repositories.Homeworks
import com.example.data.models.Homework
import io.ktor.http.*
import io.ktor.server.routing.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*

fun Route.homeworksRouting(){
    route("/homeworks") {
        get {
            try {
                //Obtener el límite de tareas a mostrar
                val limit = call.parameters["limit"]?.toIntOrNull() ?: 10
                //Obtener el offset de tareas a mostrar
                val offset = call.parameters["offset"]?.toIntOrNull() ?: 0
                //Obtener todas las tareas
                call.respond(HttpStatusCode(200,"OK"), Homeworks.getAll(limit, offset))
            }catch (cause: Throwable){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }

        }

        post {
            //Obtener los datos de la tarea a guardar
            val homework = call.receive<Homework>()
            try{
                //Guardar la tarea
                val response = Homeworks.save(homework)
                call.respond(HttpStatusCode.Created, "Tarea creada correctamente")
            }catch (cause: Throwable){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }

        get ( "/{id}" ){
            //Obtener el id de la tarea a buscar
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            try{
                //Obtener la tarea
                val response = Homeworks.getById(id)
                if (response != null){
                    call.respond(HttpStatusCode(200, "OK"), response)
                }else{
                    call.respond(HttpStatusCode.NotFound, "Tarea no encontrada")
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
                val homework = Homeworks.getById(id)
                if (homework != null){
                    val response = Homeworks.update(id, homework)
                    call.respond(HttpStatusCode(200, "OK"), response)
                }else{
                    call.respond(HttpStatusCode.NotFound, "Tarea no encontrada")
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
                val homework = Homeworks.getById(id)
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
    }
}