package com.example.data.models.gpt

import kotlinx.serialization.Serializable

@Serializable
data class MessagesItem(val role: String = "",
                        val content: String = "")