package com.example.routes
import com.example.data.models.LoginRequest
import com.example.data.repositories.Users
import com.example.utils.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys
import java.text.SimpleDateFormat
import java.util.*

fun Route.loguinRouting(){

    route("/login"){

        //loguin, recibe email and password
        post {
            try {
                val loginRequest = call.receive<LoginRequest>()
                val user = Users.searchEmail(loginRequest.email)

                if (user != null && user.contrasena == loginRequest.password) {

                    val expirationTime = Calendar.getInstance()
                    expirationTime.add(Calendar.WEEK_OF_YEAR, 1) // Agregar 1 semana al tiempo actual
                    // Generar una clave segura basada en un string
                    val secretKey = Keys.hmacShaKeyFor("hola_mundo_de_class_buddy_ojeda_bolaños_logroño_secaira".toByteArray())

                    val token = Jwts.builder()
                        .setSubject(user.id.toString()) // El sujeto del token es el ID del usuario
                        .setIssuedAt(Date()) // Fecha de emisión del token
                        .setExpiration(expirationTime.time) // Fecha de expiración del token (1 semana)
                        .signWith(secretKey) // Utilizar la clave secreta generada
                        .compact()
                    val response = ResponseToken(true, "Credenciales Validadas", user, token)
                    sendJsonResponse(call, HttpStatusCode.OK    , response)
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