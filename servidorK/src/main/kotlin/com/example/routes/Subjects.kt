package com.example.routes

import com.example.data.models.Subject
import com.example.data.repositories.Subjects
import com.example.logica.SubjectLogic
import com.example.utils.Response
import com.example.utils.ResponseEmpty
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
                //enviamos a capa logica
                val res = SubjectLogic().getAll();
                if(res!=null){
                    val response = Response(true,"Materias obtenidas correctamente", res)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = ResponseEmpty(false,"No se encontraron materias", res)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }

            }catch (
                cause: Throwable
            ) {
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
        get("/{id}") {
            try {
                val id = call.parameters["id"]?.toIntOrNull() ?: 0
                //Enviamos a capa logica
                val res = SubjectLogic().getById(id);
                if(res!=null){
                    val response = Response(true,"Materia obtenida correctamente", res)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = ResponseEmpty(false,"No se encontro materia", res)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
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