package com.example.routes

import com.example.data.models.User
import com.example.data.repositories.Users
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*


fun Route.usuariosRouting() {

    route("/users") {
        //GET /users
        get {
             //Obtenemos el limite de usuarios a mostrar
            val limit = call.parameters["limit"]?.toIntOrNull() ?: 10
            //Obtenemos el offset de usuarios a mostrar
            val offset = call.parameters["offset"]?.toIntOrNull() ?: 0
            //Obtenemos los usuarios
            call.respond(HttpStatusCode(200,"OK"),Users.getAll(limit, offset))

        }

        post {

            //Obtenemos el usuario a guardar
            val user = call.receive<User>()
            try {
                //Guardamos el usuario
                val response = Users.save(user)
                call.respond(HttpStatusCode.Created, "Usuario creado correctamente")
            }catch (
                cause: Throwable
            ){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
        get("/{id}") {
            //Obtenemos el id del usuario a buscar
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            try {
                //Obtenemos el usuario
                val response = Users.getById(id)
                if (response != null) {
                    call.respond(HttpStatusCode(200, "OK"), response)
                } else {
                    call.respond(HttpStatusCode.NotFound, "Usuario no encontrado")
                }
            }catch (
                cause: Throwable
            ){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }

        }
        put("/{id}") {
            //Obtenemos el id del usuario a actualizar
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            //Obtenemos el usuario a actualizar
            val user = call.receive<User>()
            //Actualizamos el usuario
            try {
                val user = Users.getById(id)

                if (user != null) {
                    val response = Users.update(id, user)
                    call.respond(HttpStatusCode.OK,response)
                } else {
                    call.respond(HttpStatusCode.NotFound, "Usuario no encontrado")
                }
            }catch (
                cause: Throwable
            ){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }

        }
        delete ("/{id}"){
            //Obtenemos el id del usuario a eliminar
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            //Eliminamos el usuario
            try {
                val response = Users.delete(id)
                if (response != null) {
                    call.respond(HttpStatusCode.OK,response)
                } else {
                    call.respond(HttpStatusCode.NotFound, "Usuario no encontrado")
                }
            }catch (
                cause: Throwable
            ){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
    }
}