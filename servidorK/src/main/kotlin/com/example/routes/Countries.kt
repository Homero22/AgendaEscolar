package com.example.routes

import com.example.data.models.Country
import com.example.data.repositories.Countries
import com.example.utils.ErrorResponse
import com.example.utils.Response
import com.example.utils.sendJsonResponse
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*


fun Route.countriesRouting() {
    route("/countries") {
        get {

            //GET /countries
            try {
                //Obtenemos el limite de paises a mostrar
                val limit = call.parameters["limit"]?.toIntOrNull() ?: 214
                //Obtenemos el offset de paises a mostrar
                val offset = call.parameters["offset"]?.toIntOrNull() ?: 0
                //Obtenemos los paises
                val countries = Countries.getAll(limit, offset)

                val response = Response(true, "Paises obtenidos correctamente", countries)
                sendJsonResponse(call, HttpStatusCode.OK, response)
            }catch (e: Throwable){
                val errorResponse = ErrorResponse(false, e.message ?: "Error desconocido")
                // Envia la respuesta JSON de error en el catch
                sendJsonResponse(call, HttpStatusCode.BadRequest, errorResponse)
            }
        }
        get("/{id}") {
            //GET /countries/{id}
            //Obtenemos el id del pais a buscar
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            try {
                //Obtenemos el pais
                val country = Countries.getById(id)
                if (country != null) {
                    call.respond(HttpStatusCode.OK, country)
                } else {
                    call.respond(HttpStatusCode.NotFound, "Pais no encontrado")
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
            val country = call.receive<Country>()
            try {
                //Guardamos el pais
                val response = Countries.save(country)
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
            val country = call.receive<Country>()
            try {
                //Actualizamos el pais
                val response = Countries.update(id, country)
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
                val response = Countries.delete(id)
                call.respond(HttpStatusCode.OK, response)
            }catch (
                cause: Throwable
            ){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }

    }
}