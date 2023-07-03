package com.example.routes

import com.example.data.models.Subject
import com.example.logica.SubjectLogic
import com.example.utils.*
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
                    val response = ResponseSingle(true,"Materia obtenida correctamente", res)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = ResponseSimple(false,"No se encontro materia")
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }

            }catch (
                cause: Throwable
            ) {
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
        get ("/user/{id}"){

            try {
                val id = call.parameters["id"]?.toIntOrNull() ?: 0
                //Enviamos a capa logica
                val res = SubjectLogic().getByUserId(id);
                if(res!=null){
                    val response = ResponseSingle(true,"Materias obtenidas correctamente", res)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = ResponseSimple(false,"No se encontraron materias")
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }

            }catch (
                cause: Throwable
            ) {
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }

        }
        get("/total") {
            try {
                //Enviamos a capa logica
                val res = SubjectLogic().getTotal(1);
                if(res!=null){
                    val response = ResponseSingle(true,"Total de materias obtenido correctamente", res)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = ResponseSimple(false,"No se pudo obtener total de materias")
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
                //Enviamos a capa logica
               val res = SubjectLogic().save(subject);
                if(res ==1){
                     val response = ResponseSingle(true,"Materia guardada correctamente", res)
                     sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = ResponseSimple(false,"No se pudo guardar materia")
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }


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
                //Enviamos a capa logica
                val res = SubjectLogic().update(id, subject);
                if(res!=null){
                    val response = ResponseSingle(true,"Materia actualizada correctamente", res)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = ResponseSimple(false,"No se pudo actualizar materia")
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }
            }catch (
                cause: Throwable
            ) {
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
        delete("/{id}") {
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            try {
                //Enviamos a capa logica
                val res = SubjectLogic().eliminar(id);
                if(res!=null){
                    val response = ResponseSingle(true,"Materia eliminada correctamente", res)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = ResponseSimple(false,"No se pudo eliminar materia")
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }
            }catch (
                cause: Throwable
            ) {
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
    }
}