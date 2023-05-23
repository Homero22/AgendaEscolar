package com.example.database
import org.jetbrains.exposed.sql.Table



object Usuarios: Table("seguridad.usuarios") {

    val str_usuario_nombre = varchar("str_usuario_nombre", 100)

}
