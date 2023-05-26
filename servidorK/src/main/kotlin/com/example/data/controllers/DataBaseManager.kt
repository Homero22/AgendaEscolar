package com.example.data.controllers

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import mu.KotlinLogging
import org.jetbrains.exposed.sql.Database


object DataBaseManager {
    private val logger = KotlinLogging.logger {}

    fun init(
        jdbcUrl: String,
        driverClassName: String,
        username: String,
        password: String,
        maximumPoolSize: Int = 10,
        initDatabaseData: Boolean = false
    ) {
        // Aplicamos Hiraki para la conexión a la base de datos (Pool de conexiones)

        println("Inicializando conexión a la base de datos")

        val config = HikariConfig()

        config.apply {
            this.jdbcUrl = jdbcUrl
            this.driverClassName = driverClassName
            this.username = username
            this.password = password
            this.maximumPoolSize = maximumPoolSize
        }

        Database.connect(HikariDataSource(config))
        logger.info{ "Conexión a la base de datos establecida" }

    }



}