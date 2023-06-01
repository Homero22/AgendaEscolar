package com.example.plugins

import com.example.routes.countriesRouting
import com.example.routes.subjectsRouting
import com.example.routes.usuariosRouting
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        get("/") {
            call.respondText("Hello World!")
        }
        usuariosRouting()
        countriesRouting()
        subjectsRouting()
    }
}
