package com.example.plugins

import com.example.routes.countriesRouting
import com.example.routes.usuariosRouting
<<<<<<< HEAD
import com.example.routes.homeworksRouting
=======
import com.example.routes.notesRouting
>>>>>>> 564bc313ed70c7eab036f1987e06d906b698926a
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
        homeworksRouting()
        notesRouting()
    }
}
