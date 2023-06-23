package com.example.data.models.gpt

data class GptPost(val temperature: Double = 0.0,
                   val messages: List<MessagesItem>?,
                   val model: String = "")