package com.example.data.models

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.dao.id.EntityID

@Serializable
data class User(
    val id: Long=0L,
    val nombre: String,
    val apellido: String,
    val rol: String,
    val telefono: String,
    val correo: String,
    val contrasena: String,
    val paisId: Int,
    val nivelEstudio: String,
    val fechaCreacion: String,
    val estado: String,
)


