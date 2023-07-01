package com.example.services.Whatsapp

import kotlinx.serialization.Serializable

@Serializable
data class numberWpp (
    val message: String,
    val phone: String
)
