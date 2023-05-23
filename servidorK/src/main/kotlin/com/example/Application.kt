package com.example

import com.example.database.DatabaseConnector
import com.example.plugins.configureRouting
import com.example.plugins.configureSerialization
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

fun main() {
    embeddedServer(
        Netty,
        port = 4000,
        host = "127.0.0.1",
        module = Application::module)
        .start(wait = true)
}


fun Application.module() {
    DatabaseConnector.connect()
    configureSerialization()
    configureRouting()
}
