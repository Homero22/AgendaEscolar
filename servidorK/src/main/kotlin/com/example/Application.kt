package com.example

import com.example.data.controllers.DataBaseManager
import com.example.plugins.configureHTTP
import com.example.plugins.configureRouting
import com.example.plugins.configureSerialization
import com.typesafe.config.ConfigFactory
import io.ktor.server.application.*
import io.ktor.server.config.*
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

fun main(args: Array<String>): Unit =
    io.ktor.server.netty.EngineMain.main(args)

@OptIn(DelicateCoroutinesApi::class)
@Suppress("unused") // application.conf references the main function. This annotation prevents the IDE from marking it as unused.
fun Application.module() {

    GlobalScope.launch {
        val config = HoconApplicationConfig(ConfigFactory.load())
        DataBaseManager.init(config)
        println(System.getenv("APIKEY"))
        configureSerialization()
        //configureDatabases()
        configureRouting()
        configureHTTP()
    }

}
