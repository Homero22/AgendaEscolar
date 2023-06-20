package com.example.plugins

import com.example.routes.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        get("/") {
            call.respondText("El servidor de classBuddy te responde")
        }
        usuariosRouting()
        countriesRouting()
        subjectsRouting()
        horariosRouting()
        homeworksRouting()
        notesRouting()
        loguinRouting()
        recoverRouting()
    }
}
