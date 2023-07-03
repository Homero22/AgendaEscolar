package com.example.data.entities

import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Column

object Images: IntIdTable("tb_images") {
    val images : Column<ByteArray> = binary("image", 100000000) // 100 MB
    val estado = varchar("str_images_estado",255).default("ACTIVO")

}