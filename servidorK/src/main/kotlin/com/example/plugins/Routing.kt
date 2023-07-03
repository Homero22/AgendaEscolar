package com.example.plugins


import com.example.routes.*
import com.typesafe.config.ConfigFactory
import io.ktor.server.application.*
import io.ktor.server.config.*
import io.ktor.server.http.content.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.io.File
import java.io.FileInputStream
import java.nio.file.Paths
import java.util.*

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
        // Configuración de la ruta para servir archivos estáticos

        val config = HoconApplicationConfig(ConfigFactory.load())
        val uploadPath = config.property("upload.path").getString()
        val folder = Paths.get(uploadPath).toAbsolutePath().toString()

        println("Aboslute path: $folder")
        staticFiles(
            "/uploads",
            File(folder)
        )
        imagenesRouting()

    }

}
