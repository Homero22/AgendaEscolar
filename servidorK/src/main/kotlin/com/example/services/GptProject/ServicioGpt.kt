package com.example.services.GptProject

import com.example.data.models.gpt.GptPost
import com.example.data.models.gpt.GptResponse
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST

interface ServicioGpt {
    @POST("chat/completions")
    suspend fun getGpt(
        @Body data: GptPost,
        @Header("Authorization") barer:String): GptResponse

}