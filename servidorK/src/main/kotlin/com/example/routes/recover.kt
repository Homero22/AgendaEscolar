package com.example.routes

import com.example.data.models.*
import com.example.data.models.RecoverRequest
import com.example.logica.recuperarContrasena
import com.example.utils.ErrorResponse
import com.example.utils.Response
import com.example.utils.sendJsonResponse
import com.google.gson.Gson
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*



fun Route.recoverRouting(){

    route("/recover"){

        post {
            try {
                //recive como parametro el email
                val recoverRequest = call.receive<RecoverRequest>()
                //llamar al método recoverPassword de la clase recuperarContrasena
                val user = recuperarContrasena().recoverPassword(recoverRequest.email)
                println("LLega de la CAPA LOGICA"+user)
                if (user ==1) {
                    val response = Response(true, "mensaje", emptyList())

                    // Envia la respuesta JSON exitosa
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                } else {

                    // Crea el objeto de respuesta para el error
                    val errorResponse = Response(false, "El correo no existe", emptyList())

                    // Envia la respuesta JSON de error
                    sendJsonResponse(call, HttpStatusCode.Unauthorized, errorResponse)

                }
            }catch ( cause: Throwable ){

                // Crea el objeto de respuesta para el error en el catch
                val errorResponse = ErrorResponse(false, cause.message ?: "Error desconocido")

                // Envia la respuesta JSON de error en el catch
                sendJsonResponse(call, HttpStatusCode.BadRequest, errorResponse)
            }
        }

    }
}