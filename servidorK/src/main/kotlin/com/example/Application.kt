package com.example

import com.example.data.controllers.DataBaseManager
import com.example.plugins.configureRouting
import com.example.plugins.configureSerialization
import com.example.services.sendEmail
import com.typesafe.config.ConfigFactory
import io.ktor.server.application.*
import io.ktor.server.config.*

fun main(args: Array<String>): Unit =
    io.ktor.server.netty.EngineMain.main(args)

@Suppress("unused") // application.conf references the main function. This annotation prevents the IDE from marking it as unused.
fun Application.module() {
    val config = HoconApplicationConfig(ConfigFactory.load())
    DataBaseManager.init(config)
    configureSerialization()
    //configureDatabases()
    configureRouting()

        val to = "estefygonzalez68@gmail.com"
        val subject = "¡Hola desde Ktor!"
        val body = "¡Hola! Este es un correo electrónico de prueba."

        sendEmail(to, subject, body)


}
