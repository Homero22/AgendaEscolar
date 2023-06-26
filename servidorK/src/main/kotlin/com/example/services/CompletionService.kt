package com.example.services

import com.example.data.models.gpt.GptPost
import com.example.data.models.gpt.GptResponse
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST

interface CompletionService {
    @POST("chat/completions")
    suspend fun getCompletion(
        @Body completionData: GptPost,
        @Header("Authorization") barer: String
    ):GptResponse

}