package com.example.routes

import com.example.logica.ReportesLogic
import com.example.utils.ResponseSingle
import com.example.utils.sendJsonResponse
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.reportesRouting(){
    route("/reportes"){
        get("/usuariosPais"){
            try{
                val res = ReportesLogic().reporteUsuarios()
                if(res!=null){
                    println(res.toString())
                    val res = ResponseSingle(true,"Reporte de usuarios obtenido correctamente", res)
                    sendJsonResponse(call, HttpStatusCode.OK, res)
                }else{
                    val res = ResponseSingle(false,"No se pudo obtener el reporte de usuarios", res)
                    sendJsonResponse(call, HttpStatusCode.OK, res)
                }
            }catch (
                cause: Throwable
            ){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }

        }
    }

}