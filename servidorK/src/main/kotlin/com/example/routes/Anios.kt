package com.example.routes

import com.example.logica.UserLogic
import com.example.utils.ResponseSimple
import com.example.utils.ResponseSingle
import com.example.utils.sendJsonResponse
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.aniosRouting(){
    route("/anios") {
        get{
            try{
                val res = UserLogic().getAllAnios();
                if(res.isNotEmpty()){
                    val response = ResponseSingle(true,"Años obtenidos correctamente", res)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = ResponseSimple(false,"No se encontraron años")
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }
            }catch (
                cause: Throwable
            ) {
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }
    }
}