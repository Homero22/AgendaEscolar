package com.example.config

// config/EnvConfig.kt
import io.github.cdimascio.dotenv.Dotenv
object EnvConfig {
    private val dotenv: Dotenv = Dotenv.load()
    val dbUrl: String = dotenv["DB_URL"]
    val dbUsername: String = dotenv["DB_USERNAME"]
    val dbPassword: String = dotenv["DB_PASSWORD"]
    val dbDriver: String = dotenv["DB_DRIVER"]
}
