package com.example.data.models

import kotlinx.serialization.Serializable

@Serializable
data class Schedule(
    var id: Int,
    val usuarioMateria: String,
    val hora_inicio: String,
    val hora_fin: String,
    val dia: String
)
