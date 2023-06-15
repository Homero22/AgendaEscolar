package com.example.routes

import com.example.data.models.Subject
import com.example.data.repositories.Subjects
import com.example.utils.Response
import com.example.utils.sendJsonResponse
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.subjectsRouting(){
    route("/subjects") {
        get {
            try {
                val limit = call.parameters["limit"]?.toIntOrNull() ?: 10
                val offset = call.parameters["offset"]?.toIntOrNull() ?: 0
                val subjects = Subjects.getAll(limit, offset)
                val r = Response(true, "Materias obtenidas correctamente", subjects)
                sendJsonResponse(call, HttpStatusCode.OK, r)
            }catch (
                cause: Throwable
            ) {
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
        get("/{id}") {
            try {
                val id = call.parameters["id"]?.toIntOrNull() ?: 0
                val subject = Subjects.getById(id)
                if (subject != null) {
                    call.respond(HttpStatusCode.OK, subject)
                } else {
                    call.respond(HttpStatusCode.NotFound, "Materia no encontrada")
                }
            }catch (
                cause: Throwable
            ) {
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
        post {
           try {
               println("Llega a la ruta")
                val subject = call.receive<Subject>()
               println(subject)
                val response = Subjects.save(subject)
                call.respond(HttpStatusCode.Created, response)
           }catch (
                cause: Throwable
           ) {
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
           }

        }
        put("/{id}") {
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            val subject = call.receive<Subject>()
            try {
                val response = Subjects.update(id, subject)
                call.respond(HttpStatusCode.OK, response)
            }catch (
                cause: Throwable
            ) {
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
        delete("/{id}") {
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            try {
                val response = Subjects.delete(id)
                if(response!=null){
                    call.respond(HttpStatusCode.OK, "Materia eliminada")
                }else{
                    call.respond(HttpStatusCode.NotFound, "Materia no encontrada")
                }
            }catch (
                cause: Throwable
            ) {
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
    }
}