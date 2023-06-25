package com.example.services

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class gpt {
    companion object Servicio{
        fun getRetrofitInstance():Retrofit{
            val interceptor = HttpLoggingInterceptor()
            interceptor.level = HttpLoggingInterceptor.Level.BODY
            val client = OkHttpClient.Builder().addInterceptor(interceptor).build()
            return Retrofit.Builder()
                .baseUrl("https://api.openai.com/v1/")
                .addConverterFactory(GsonConverterFactory.create())
                .client(client)
                .build()
        }
    }

}