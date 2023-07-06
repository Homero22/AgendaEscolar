package com.example.utils

import com.google.gson.Gson
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*


data class Response(val status: Boolean, val message: String, val body: List<Any>)
data class GptResponse(val status: Boolean, val message: String, val info :Any)

//respuesta sin body

data class ResponseEmpty(val status: Boolean, val message: String, val emptyList: List<Any>)
data class ResponseImage(val status: Boolean, val message:String, val image : ByteArray) {


    override fun hashCode(): Int {
        var result = status.hashCode()
        result = 31 * result + message.hashCode()
        result = 31 * result + image.contentHashCode()
        return result
    }
}

data class ResponseSimple(val status: Boolean, val message: String)
data class ResponseToken(val status: Boolean, val message: String, val body: Any, val token: Any)

data class ResponseSingle(val status: Boolean, val message: String, val body: Any)
data class ErrorResponse(val status: Boolean, val message: String)
suspend fun sendJsonResponse(call: ApplicationCall, status: HttpStatusCode, response: Any) {
    val gson = Gson()
    val jsonResponse = gson.toJson(response)
    call.respondText(jsonResponse, ContentType.Application.Json, status)
}
