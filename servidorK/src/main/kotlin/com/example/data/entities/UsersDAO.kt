package com.example.data.entities

import com.example.data.entities.Homeworks.references
import com.example.data.models.User
import org.jetbrains.exposed.dao.LongEntity
import org.jetbrains.exposed.dao.LongEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.LongIdTable
import org.jetbrains.exposed.sql.javatime.datetime

object Users : LongIdTable("tb_usuarios") {

    val nombre = varchar("str_usuario_nombre", 255)
    val apellido = varchar("str_usuario_apellido", 255)
    val rol = varchar("str_usuario_rol", 255)
    val telefono = varchar("str_usuario_telefono", 255).uniqueIndex()
    val correo = varchar("str_usuario_correo", 255).uniqueIndex()
    val contrasena = varchar("str_usuario_contrasena", 255)
    val paisId = integer("str_pais_id").references(Countries.id)
    val nivelEstudio = varchar("str_nivel_estudio", 255)
    val fechaCreacion = datetime("dt_fecha_creacion")
    val estado = varchar("str_usuario_estado", 255).default("ACTIVO")
}

//clase que mapea la tabla de usuarios

class UsersDAO(id: EntityID<Long>) : LongEntity(id) {
    companion object : LongEntityClass<UsersDAO>(Users)
    var nombre by Users.nombre
    var apellido by Users.apellido
    var rol by Users.rol
    var telefono by Users.telefono
    var correo by Users.correo
    var contrasena by Users.contrasena
    var paisId by Users.paisId
    var nivelEstudio by Users.nivelEstudio
    var fechaCreacion by Users.fechaCreacion
    var estado by Users.estado

    fun toUser():User{
        return User(
            id.value.toInt(),
            nombre,
            apellido,
            rol,
            telefono,
            correo,
            contrasena,
            paisId,
            nivelEstudio,
            fechaCreacion.toString(),
            estado
        )
    }
}