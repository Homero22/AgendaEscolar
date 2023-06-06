package com.example.routes

import com.example.data.models.*
import com.example.data.models.RecoverRequest
import com.example.logica.recuperarContrasena
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
                if (user != null) {
                    //responder con un status true, messege y el usuario
                    call.respond(HttpStatusCode.OK,user)

                } else {
                    call.respond(HttpStatusCode.Unauthorized, "El correo no existe")
                }
            }catch ( cause: Throwable ){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }

    }
}