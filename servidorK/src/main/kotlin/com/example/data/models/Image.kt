package com.example.data.models

import kotlinx.serialization.Serializable

@Serializable
data class Image (
    val id: Long,
    val imagenes: String,
    val estado: String
)
