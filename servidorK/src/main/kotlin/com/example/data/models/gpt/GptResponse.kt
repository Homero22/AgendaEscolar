package com.example.data.models.gpt

data class GptResponse(val created: Int = 0,
                       val usage: Usage,
                       val model: String = "",
                       val id: String = "",
                       val choices: List<ChoicesItem>?,
                       val `object`: String = "")