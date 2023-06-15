package com.example.routes

import com.example.data.models.SubjectUser
import com.example.data.repositories.SubjectsUsers
import com.example.data.repositories.cGenerica
import com.example.logica.SubjectLogic
import com.example.utils.Response
import com.example.utils.ResponseEmpty
import com.example.utils.ResponseSingle
import com.example.utils.sendJsonResponse
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

val oSubject = cGenerica<SubjectsUsers>();
fun Route.UsumateRouting() {
    route("/subjectsusres") {
        get {
            //GET /schedules
            try {
                //Obtenemos el limite de paises a mostrar
                val limit = call.parameters["limit"]?.toIntOrNull() ?: 10
                //Obtenemos el offset de paises a mostrar
                val offset = call.parameters["offset"]?.toIntOrNull() ?: 0
                //Obtenemos los paises
                val respuesta = SubjectLogic().getAll(limit, offset);
                if (respuesta != null) {
                    val response = Response(true, "Materias obtenidas correctamente", respuesta)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = ResponseEmpty(false, "No existen materias")
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }
            }catch (
                cause: Throwable
            ){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
        get("/{id}") {
            //GET /countries/{id}
            //Obtenemos el id del pais a buscar
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            try {
                val respuesta = SubjectLogic().getOne(id);
                if (respuesta != null) {
                    val response = ResponseSingle(true, "Materia obtenida correctamente", respuesta)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = ResponseEmpty(false, "No existe la materia")
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                    }
            }catch (
                cause: Throwable
            ){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
        post {

            try {
            val subjectu = call.receive<SubjectUser>()
            val respuesta = SubjectLogic().createSubject(subjectu)
            if (respuesta==1) {
                val response = ResponseSingle(true, "Materia creada correctamente", subjectu)
                sendJsonResponse(call, HttpStatusCode.Created, response)
            } else if(respuesta == 0) {
                val response = ResponseSingle(false, "Ya registraste esta materia", subjectu)
                sendJsonResponse(call, HttpStatusCode.OK, response)
            }
            }catch (
                cause: Throwable
            ){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
        put("/{id}") {
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            val subjectu = call.receive<SubjectUser>()
            try {
              val respuesta = SubjectLogic().actualizar(id,subjectu)
                if (respuesta != null) {
                    val response = ResponseSingle(true, "Materia actualizada correctamente", respuesta)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = ResponseEmpty(false, "No existe la materia")
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }
            }catch (
                cause: Throwable
            ){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
        delete("/{id}") {
            //DELETE /countries/{id}
            //Obtenemos el id del pais a eliminar
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            try {
               val respuesta = SubjectLogic().eliminar(id)
                if (respuesta == 1) {
                    val response = ResponseEmpty(true, "Materia eliminada correctamente")
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else if (respuesta == 0){
                    val response = ResponseEmpty(false, "No existe la materia")
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
