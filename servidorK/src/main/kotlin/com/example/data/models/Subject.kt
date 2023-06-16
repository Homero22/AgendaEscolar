package com.example.data.models

import kotlinx.serialization.Serializable

@Serializable
data class Subject (
    val id: Int=0,
    val idUser: Long,
    val nombre: String,
    val materiaAcro: String,
    val materiaColor: String,
    val profesorNombre: String
)