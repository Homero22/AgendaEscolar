package com.example.database

import com.example.config.DatabaseConfig
import com.example.config.EnvConfig
import org.jetbrains.exposed.sql.Database


object DatabaseConnector : DatabaseConfig {
    private val envConfig = EnvConfig

    override val url: String = envConfig.dbUrl
    override val driver: String = envConfig.dbDriver
    override val user: String = envConfig.dbUsername
    override val password: String = envConfig.dbPassword
    fun connect() {
        try{
            Database.connect(url = url, driver = driver, user = user, password = password)
            println("Conexión establecida")
        } catch (e: Exception) {
            println("Error al conectar a la base de datos")
            println(e.message)
        }
    }
    private fun disconnect() {
        println("Desconectando...")

    }

}
