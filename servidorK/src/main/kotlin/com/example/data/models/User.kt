package com.example.data.models

import kotlinx.serialization.Serializable

@Serializable
data class User(
    val id: Int = 0,
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
@Serializable
data class LoginRequest(
    val email: String,
    val password: String
)

@Serializable
data class RecoverRequest(
    val email: String
)

