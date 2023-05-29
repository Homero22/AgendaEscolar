package com.example.data.models

import kotlinx.serialization.Serializable

@Serializable
data class SubjectUser(
    var id: Int,
    val idUsuario: String,
    val idMateria: String,
    val materiaAcro: String,
    val materiaColor: String,
    val profesorNombre: String
)