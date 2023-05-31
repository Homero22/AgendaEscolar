package com.example.routes

import com.example.data.models.SubjectUser
import com.example.data.repositories.SubjectsUsers
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*


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
                val usumate = SubjectsUsers.getAll(limit, offset)

                call.respond(HttpStatusCode.OK, usumate)
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
                //Obtenemos el pais
                val subjectus = SubjectsUsers.getById(id)
                if (subjectus != null) {
                    call.respond(HttpStatusCode.OK, subjectus)
                } else {
                    call.respond(HttpStatusCode.NotFound, "Materia no encontrada")
                }
            }catch (
                cause: Throwable
            ){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
        post {

            val subjectu = call.receive<SubjectUser>()
            try {
                //Guardamos el pais
                val response = SubjectsUsers.save(subjectu)
                call.respond(HttpStatusCode.Created, response)
            }catch (
                cause: Throwable
            ){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
        put("/{id}") {
            //PUT /countries/{id}
            //Obtenemos el id del pais a actualizar
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            //Obtenemos el pais a actualizar
            val subjectu = call.receive<SubjectUser>()
            try {
                //Actualizamos el pais
                val response = SubjectsUsers.update(id, subjectu)
                call.respond(HttpStatusCode.OK, response)
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
                //Eliminamos el pais
                val response = SubjectsUsers.delete(id)
                call.respond(HttpStatusCode.OK, response)
            }catch (
                cause: Throwable
            ){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }

    }
}
