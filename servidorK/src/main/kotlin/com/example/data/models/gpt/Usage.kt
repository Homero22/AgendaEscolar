package com.example.data.models.gpt

import kotlinx.serialization.Serializable

@Serializable
data class Usage(val completion_tokens: Int = 0,
                 val prompt_tokens: Int = 0,
                 val total_tokens: Int = 0)