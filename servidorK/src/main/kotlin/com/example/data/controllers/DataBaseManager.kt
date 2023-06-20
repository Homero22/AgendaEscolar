
package com.example.data.controllers
import com.example.data.entities.*
import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import io.ktor.server.config.*
import mu.KotlinLogging
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction



object DataBaseManager {
    private val logger = KotlinLogging.logger {}
    fun init(config:ApplicationConfig) {

        val jdbcUrl = config.property("storage.jdbcUrl").getString()
        val driverClassName = config.property("storage.driverClassName").getString()
        val username = config.property("storage.username").getString()
        val password = config.property("storage.password").getString()
        val maximumPoolSize = config.propertyOrNull("storage.maximumPoolSize")?.getString()?.toIntOrNull() ?: 10




        Database.connect(jdbcUrl,driverClassName,username,password);


        // Aplicamos Hiraki para la conexión a la base de datos (Pool de conexiones)

        println("Inicializando conexión a la base de datos")




        val configHikariConfig = HikariConfig()
        println(password);
        configHikariConfig.apply {
            this.jdbcUrl = jdbcUrl
            this.driverClassName = driverClassName
            this.username = username
            this.password = password
            this.maximumPoolSize = maximumPoolSize
        }

        Database.connect(HikariDataSource(configHikariConfig));
        transaction {

            SchemaUtils.create(Countries);
            SchemaUtils.create(Homeworks);
            SchemaUtils.create(Notes);
            SchemaUtils.create(Horarios);
            SchemaUtils.create(Users);

        }
        //Crear las tablas


        logger.info{ "Conexión a la base de datos establecida" }

    }

}