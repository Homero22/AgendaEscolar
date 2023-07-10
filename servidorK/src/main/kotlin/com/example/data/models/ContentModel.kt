package com.example.data.models

import kotlinx.serialization.Serializable

@Serializable
data class ContentModel (
    val id: Int,
    val idApunte: Long,
    val contenido: String,
    val estado: String,
    val puntuacion: Int,
    val idUser: Long,
    val categoria: String
)


