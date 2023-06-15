package com.example.data.models

import kotlinx.serialization.Serializable

@Serializable
data class SubjectUser(
    var id: Int=0,
    val idUsuario: Long,
    val idMateria: Int,
    val materiaAcro: String,
    val materiaColor: String,
    val profesorNombre: String
)