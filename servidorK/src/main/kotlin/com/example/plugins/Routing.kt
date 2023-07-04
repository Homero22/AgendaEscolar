package com.example.plugins

import com.example.routes.*
import io.github.cdimascio.dotenv.dotenv
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.io.File
import java.nio.file.Paths

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
        chatGptRoute()
        reportesRouting()
        aniosRouting()

        imagenesRouting()


    }

}
