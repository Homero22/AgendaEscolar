package com.example.routes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.usuariosRouting() {
    route("/users") {
        //GET /users
        get {
            call.respondText("Hola")
            /*
            //Obtenemos el limite de usuarios a mostrar
            val limit = call.parameters["limit"]?.toIntOrNull() ?: 10
            //Obtenemos el offset de usuarios a mostrar
            val offset = call.parameters["offset"]?.toIntOrNull() ?: 0
            //Obtenemos los usuarios
            call.respond(Users.getAll(limit, offset.toLong()))
            */
        }

        post {
            call.respond(HttpStatusCode.OK, "Hola")
        }
    }
}