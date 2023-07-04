package com.example.data.models

import kotlinx.serialization.Serializable

@Serializable
data class Image (
    val id: Int,
    val imagenes: String,
    val estado: String,
    val path: String
)
