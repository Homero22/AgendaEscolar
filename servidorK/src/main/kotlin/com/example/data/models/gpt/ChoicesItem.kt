package com.example.data.models.gpt

data class ChoicesItem(val finishReason: String = "",
                       val index: Int = 0,
                       val message: Message)