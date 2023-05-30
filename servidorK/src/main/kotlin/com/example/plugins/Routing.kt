package com.example.plugins

import com.example.routes.countriesRouting
import com.example.routes.usuariosRouting
import com.example.routes.notesRouting
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
        notesRouting()

    }
}
