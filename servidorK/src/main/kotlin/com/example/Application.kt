package com.example

import com.example.data.controllers.DataBaseManager
import com.example.plugins.configureRouting
import com.example.plugins.configureSerialization
import io.github.cdimascio.dotenv.Dotenv
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
fun main() {
    embeddedServer(Netty, port = 8000, host = "0.0.0.0", module = Application::module)
        .start(wait = true)

}

fun Application.module() {
    val dotenv = Dotenv.configure().directory("servidorK/.env").load()
    DataBaseManager.init(
        dotenv["DB_URL"],
        dotenv["DB_DRIVER"],
        dotenv["DB_USERNAME"],
        dotenv["DB_PASSWORD"],
        10,
        true
    )
    configureSerialization()
    configureRouting()
}

