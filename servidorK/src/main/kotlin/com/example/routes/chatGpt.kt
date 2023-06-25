package com.example.routes

import com.example.data.models.promptModel
import com.example.logica.ChatLogic
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.chatGptRoute(){
    route("/gpt"){
        get("/{id}"){
           try {
               val id = call.parameters["id"]?.toIntOrNull() ?: 0
               val data = call.receive<Any>()
               //Enviamos a capa logica
               val res = ChatLogic().getById(id,data);
                call.respond(HttpStatusCode.OK, res)
           }catch (
               cause: Throwable
           ) {
               call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")

            }
        }
        post {
            try{
                val prompt = call.receive<promptModel>()
                val res = ChatLogic().post(prompt)
                call.respond(HttpStatusCode.OK, res)
            }catch (
                cause: Throwable
            ) {
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
    }
}