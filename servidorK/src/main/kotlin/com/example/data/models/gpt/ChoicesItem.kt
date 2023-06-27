package com.example.data.models.gpt

import kotlinx.serialization.Serializable

@Serializable
data class ChoicesItem(val finish_reason: String = "",
                       val index: Int = 0,
                       val message: MessagesItem)