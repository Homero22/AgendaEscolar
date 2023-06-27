package com.example.data.models.reportes

import kotlinx.serialization.Serializable

@Serializable
data class reportes(
    val pais : String,
    val cantidad : Int
)