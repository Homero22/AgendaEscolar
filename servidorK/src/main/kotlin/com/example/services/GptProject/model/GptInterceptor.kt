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
//   suspend fun postGpt(prompt :String, callback:(GptResponse)->Unit){
//        val service = gptInstance.getRetrofitInstance().create(ServicioGpt::class.java)
//        GlobalScope.launch(Dispatchers.IO) {
//            try {
//                var message = MessagesItem(
//                    content = prompt,
//                    role = "user"
//                )
//                var data = GptPost(
//                    0.7,
//                    List(1){message},
//                    "gpt-3.5-turbo"
//                )
//                val response = service.getGpt(data,"Bearer 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")
//                callback(response)
//            }catch (e:Exception){
//                (e as? HttpException)?.let {  }
//
//            }
//        }
//    }

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