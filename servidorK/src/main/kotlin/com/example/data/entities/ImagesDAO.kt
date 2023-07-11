package com.example.data.entities

import org.jetbrains.exposed.dao.id.IntIdTable

object ImagesDAO: IntIdTable ("tb_images"){
    
}
object Countries : IntIdTable("tb_pais") {
    val nombre = varchar("str_pais_nombre", 255).uniqueIndex()
    val acronimo = varchar("str_pais_acronimo", 255).uniqueIndex()
    val estado = varchar("str_pais_estado", 255)
}