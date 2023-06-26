package com.example.services

import com.example.data.models.gpt.GptPost
import com.example.data.models.gpt.MessagesItem
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.serialization.kotlinx.json.*

class ChatGPT {
    private val apiKey = "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"
    private val urlGpt = "https://api.openai.com/v1/chat/completions"
    private val organizationId = "org-7SIhAIhrh3BLlCN08HJDvbjF"

    private val client = HttpClient(CIO) {
        install(ContentNegotiation) {
            json()
        }
    }

    suspend fun generar(prompt: String): Any {
        val messageItem = MessagesItem(role = "user", content = prompt)
        val messageList = List(1) { messageItem }
        val data = GptPost(temperature = 0.7, messages = messageList, model = "gpt-3.5-turbo")
        println(data)
        val response = client.post(urlGpt) {
            headers {
                append("Content-Type", "application/json")
                append("Authorization", "Bearer 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")
            }
            println(data)
            setBody(data)
        }
        println(response)
        return response
    }
}






