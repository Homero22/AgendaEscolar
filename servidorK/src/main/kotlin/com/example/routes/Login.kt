package com.example.routes
import com.example.data.models.LoginRequest
import com.example.data.repositories.Users
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable

fun Route.loguinRouting(){

    route("/login"){

        //loguin, recibe email and password
        post {
            try {
                val loginRequest = call.receive<LoginRequest>()
                val user = Users.search(loginRequest.email)

                if (user != null && user.contrasena == loginRequest.password) {
                    call.respond(HttpStatusCode.OK,Users)
                } else {
                    call.respond(HttpStatusCode.Unauthorized, "Invalid credentials")
                }
            }catch ( cause: Throwable ){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }

    }
}

@Serializable
data class LoginRequest(val email: String, val password: String)
