package com.example.data.models.gpt

data class Usage(val completionTokens: Int = 0,
                 val promptTokens: Int = 0,
                 val totalTokens: Int = 0)