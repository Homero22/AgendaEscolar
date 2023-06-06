package com.example.data.models

import kotlinx.serialization.Serializable

@Serializable
data class Subject (
    val id: Int=0,
    val nombre: String
)