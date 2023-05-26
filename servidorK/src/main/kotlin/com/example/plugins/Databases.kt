package com.example.plugins

import com.typesafe.config.ConfigFactory
import io.ktor.server.application.*
import io.ktor.server.config.*
import org.jetbrains.exposed.sql.Database

fun Application.configureDatabases() {
    val config = HoconApplicationConfig(ConfigFactory.load())
    /*val databaseH2 = Database.connect(
            url = "jdbc:h2:mem:test;DB_CLOSE_DELAY=-1",
            user = "root",
            driver = "org.h2.Driver",
            password = ""
    )*/
    val databasePostgreSQL = Database.connect(
            url = config.property("storage.jdbcUrl").getString(),
            driver = config.property("storage.driverClassName").getString(),
            user = config.property("storage.username").getString(),
            password = config.property("storage.password").getString()

    )

}
