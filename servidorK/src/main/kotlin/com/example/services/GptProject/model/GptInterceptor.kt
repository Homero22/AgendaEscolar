package com.example.services.GptProject.model

import com.example.data.models.gpt.GptPost
import com.example.data.models.gpt.GptResponse
import com.example.data.models.gpt.MessagesItem
import com.example.services.GptProject.ServicioGpt
import com.example.services.GptProject.gptInstance
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.util.concurrent.CompletableFuture


class GptInterceptor {
    val scope = CoroutineScope(Dispatchers.IO)

    suspend fun postGpt(prompt: String): CompletableFuture<GptResponse> {
    val service = gptInstance.getRetrofitInstance().create(ServicioGpt::class.java)

    val completableFuture = CompletableFuture<GptResponse>()

    scope.launch {
        try {
            val message = MessagesItem(content = prompt, role = "user")
            val data = GptPost(0.7, listOf(message), "gpt-3.5-turbo")
            val response = service.getGpt(data, "Bearer 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")
            completableFuture.complete(response)
        } catch (e: Exception) {
            completableFuture.completeExceptionally(e)
        }
    }

    return completableFuture
}

}