package com.example.services

import com.example.data.models.gpt.GptPost
import com.example.data.models.gpt.MessagesItem
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*

class chatgpt {
    val apiKey = "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"
    val url = "https://api.openai.com/v1/chat/completions"
    val client = HttpClient( )

    suspend fun dataChat (prompt:String) : HttpResponse{
        val mensajeItem = MessagesItem(role = "user", content = "$prompt")
        val lisMessagesItem = listOf(mensajeItem)

        val data = GptPost(temperature = 0.7, messages = lisMessagesItem, model = "gpt-3.5-turbo")
        val response : HttpResponse = client.post(url){
            contentType(ContentType.Application.Json)
            headers {
                append(HttpHeaders.Authorization,"Bearer $apiKey")
            }
            setBody(data)
        }
        return response


    }

}





