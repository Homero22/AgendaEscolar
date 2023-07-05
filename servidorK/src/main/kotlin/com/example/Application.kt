package com.example

import com.example.data.controllers.DataBaseManager
import com.example.data.models.Image
import com.example.data.repositories.ImagesRepo

import com.example.plugins.configureHTTP
import com.example.plugins.configureRouting
import com.example.plugins.configureSerialization
import com.typesafe.config.ConfigFactory
import io.ktor.server.application.*
import io.ktor.server.config.*
import java.io.File

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
    val folderPath = object {}.javaClass.protectionDomain.codeSource.location.path
    val folder = File(folderPath).parent+File.separator+"uploads"+File.separator
    println( "folder en la ruta ad: $folder")


}
