package com.example.data.models.gpt

import kotlinx.serialization.Serializable

@Serializable
data class GptResponse(val created: Long = 0,
                       val usage: Usage,
                       val model: String = "",
                       val id: String = "",
                       val choices: List<ChoicesItem>,
                       val `object`: String = "")