package com.example.routes
import com.example.data.models.LoginRequest
import com.example.data.repositories.Users
import com.example.utils.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.routing.*

fun Route.loguinRouting(){

    route("/login"){

        //loguin, recibe email and password
        post {
            try {
                val loginRequest = call.receive<LoginRequest>()
                val user = Users.searchEmail(loginRequest.email)

                if (user != null && user.contrasena == loginRequest.password) {
                    val response = ResponseSingle(true, "Credenciales Validadas", user)
                    sendJsonResponse(call, HttpStatusCode.OK    , response)
                    //call.respond(HttpStatusCode.OK,Users)
                } else {
                    val response = Response(false, "Credenciales Invalidadas", emptyList())
                    sendJsonResponse(call, HttpStatusCode.OK , response)
                }
            }catch (e: Throwable){
                val errorResponse = ErrorResponse(false, e.message ?: "Error desconocido")
                // Envia la respuesta JSON de error en el catch
                sendJsonResponse(call, HttpStatusCode.BadRequest, errorResponse)
            }
        }

    }
}
/*
@Serializable
data class LoginRequest(val email: String, val password: String)
*/