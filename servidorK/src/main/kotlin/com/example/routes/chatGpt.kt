package com.example.routes

import com.example.data.models.promptModel
import com.example.logica.ChatLogic
import com.example.utils.GptResponse
import com.example.utils.ResponseSimple
import com.example.utils.sendJsonResponse
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
                println(prompt)
                val res = ChatLogic().postChat(prompt)
                if(res != null){
                   val response = GptResponse(true, "Información generada exitosamente", res)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val res = ResponseSimple(false, "No se pudo generar la respuesta")
                }
            }catch (
                cause: Throwable
            ) {
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }

        }
    }
}