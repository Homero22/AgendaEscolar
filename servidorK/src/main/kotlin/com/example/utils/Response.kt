package com.example.utils

import com.google.gson.Gson
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*


data class Response(val status: Boolean, val message: String, val body: List<Any>)

//respuesta sin body

data class ResponseEmpty(val status: Boolean, val message: String, val emptyList: List<Any>)
data class ResponseToken(val status: Boolean, val message: String, val body: Any, val token: Any)

data class ResponseSingle(val status: Boolean, val message: String, val body: Any)
data class ErrorResponse(val status: Boolean, val message: String)
suspend fun sendJsonResponse(call: ApplicationCall, status: HttpStatusCode, response: Any) {
    val gson = Gson()
    val jsonResponse = gson.toJson(response)
    call.respondText(jsonResponse, ContentType.Application.Json, status)
}
