package com.example

import com.example.data.controllers.DataBaseManager
<<<<<<< HEAD
import com.example.logica.HomeworksLogic
=======

>>>>>>> a27cae45b66c171057b7a5910a1acdf1c4e96cca
import com.example.plugins.configureHTTP
import com.example.plugins.configureRouting
import com.example.plugins.configureSerialization
import com.typesafe.config.ConfigFactory
import io.ktor.server.application.*
import io.ktor.server.config.*
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

fun main(args: Array<String>): Unit =
    io.ktor.server.netty.EngineMain.main(args)
@Suppress("unused") // application.conf references the main function. This annotation prevents the IDE from marking it as unused.
fun Application.module() {
    val config = HoconApplicationConfig(ConfigFactory.load())
    DataBaseManager.init(config)

    configureSerialization()
    //configureDatabases()
    configureRouting()
    configureHTTP()
<<<<<<< HEAD


    val noti = HomeworksLogic()
    noti.notificaciones()

    //nuevos cambios me
=======
>>>>>>> a27cae45b66c171057b7a5910a1acdf1c4e96cca
}
