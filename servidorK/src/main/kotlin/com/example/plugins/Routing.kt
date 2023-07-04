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
        // Configuración de la ruta para servir archivos estáticos
        //val folder = dotenv()["UPLOADS_PATH"]
        //val folder = Paths.get("src/main/resources/uploads", "images").toAbsolutePath().toString()
        val images = File("uploadsImages")
        val absolutePath = images.absolutePath
        println("Aboslute path definitivo xd : $absolutePath")

        //println("Aboslute path routing: $folder")
        staticFiles(
            "/uploads",
            File(absolutePath)
        )
        imagenesRouting()
        //D:\ClassBuddy\servidorK\src\main\resources\uploads\images

    }

}
