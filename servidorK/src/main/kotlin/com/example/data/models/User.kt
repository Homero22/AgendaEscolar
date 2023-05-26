package com.example.data.models

import kotlinx.serialization.Serializable
import java.time.LocalDateTime

@Serializable
data class User(
    val id: Int,
    val nombre: String,
    val apellido: String,
    val rol: String,
    val telefono: String,
    val correo: String,
    val contrasena: String,
    val paisId: Int,
    val nivelEstudio: String,
    val fechaCreacion: String = LocalDateTime.now().toString(),
    val estado: String = "ACTIVO"
)
