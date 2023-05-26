package com.example.data.models

import kotlinx.serialization.Serializable

@Serializable
data class Country(
    var id: Int,
    val nombre: String,
    val acronimo: String,
    val estado: String = "ACTIVO"
)
