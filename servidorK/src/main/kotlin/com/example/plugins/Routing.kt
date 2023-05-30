package com.example.plugins

import com.example.routes.countriesRouting
import com.example.routes.usuariosRouting
import com.example.routes.horariosRouting
import com.example.routes.UsumateRouting
import com.example.routes.homeworksRouting
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
        horariosRouting()
        UsumateRouting()
        homeworksRouting()
        notesRouting()
    }
}
