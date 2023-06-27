package com.example.data.models.gpt

import kotlinx.serialization.Serializable

@Serializable
data class GptPost(val temperature: Double = 0.0,
                   val messages: List<MessagesItem>,
                   val model: String = "")