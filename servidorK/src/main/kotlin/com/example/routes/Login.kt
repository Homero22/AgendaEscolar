package com.example.routes
import com.example.data.models.LoginRequest
import com.example.data.repositories.Users
import com.example.logica.LoginLogic
import com.example.utils.*
import io.jsonwebtoken.Jwt
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
                //Envio a la capa logica
                val res = LoginLogic().login(loginRequest);

                val user = Users.searchEmail(loginRequest.email)

                if (user != null && user.contrasena == loginRequest.password) {

                    val expirationTime = Calendar.getInstance()
                    expirationTime.add(Calendar.WEEK_OF_YEAR, 1) // Agregar 1 semana al tiempo actual
                    println(expirationTime.time)
                    // Generar una clave segura basada en un string
                    val secretKey = Keys.hmacShaKeyFor("hola_mundo_de_class_buddy_ojeda_bolaños_logroño_secaira".toByteArray())

                    val token = Jwts.builder()
                        .setIssuer("class-buddy") // El emisor del token es "class-buddy"
                        .setClaims(
                            mapOf(
                                "email" to user.correo,
                                "role" to user.rol
                            )

                        )
                        //tipo de jwt
                        .setHeaderParam("typ", "JWT")
                        //Firma del token
                        .signWith(secretKey, SignatureAlgorithm.HS256)
                        .setSubject(user.id.toString()) // El sujeto del token es el ID del usuario
                        .setIssuedAt(Date()) // Fecha de emisión del token
                        //fecha de expiracion
                        .setExpiration(expirationTime.time) // Fecha de expiración del token
                        .compact()



                    //enviar en una cookie el token
                    call.response.cookies.append("token", token)
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