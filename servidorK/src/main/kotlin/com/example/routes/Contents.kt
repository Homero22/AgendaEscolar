package com.example.routes

import com.example.data.models.ContentModel
import com.example.logica.ContentLogic
import com.example.utils.Response
import com.example.utils.ResponseSingle
import com.example.utils.sendJsonResponse
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.routing.*

fun Route.contentsRouting() {
    route("/contents") {
        //GET /contents
        get("/{id}") {
            //GET /contents/{id}
            //Obtenemos el id del contenido a buscar
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            //Enviamos a capa logica
            val res = ContentLogic().getById(id);
            if(res==0){
                val response = ResponseSingle(false,"No se encontró el contenido", res)
                sendJsonResponse(call, HttpStatusCode.NotFound, response)
            }else{
                val response = ResponseSingle(true,"Contenido obtenido correctamente", res)
                sendJsonResponse(call, HttpStatusCode.OK, response)
            }
        }
        post {
            //POST /contents
            //Obtenemos el contenido a guardar
            val content = call.receive<ContentModel>()
            println("PABLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
            println(content.contenido)
            //Enviamos a capa logica
            val res = ContentLogic().save(content);
            if(res == 1){
                val response = ResponseSingle(true,"Contenido guardado correctamente", res)
                sendJsonResponse(call, HttpStatusCode.OK, response)
            }else{
                val response = ResponseSingle(false,"Ya existe un contenido para este apunte", res)
                sendJsonResponse(call, HttpStatusCode.OK, response)
            }


        }
        get("/similares/{id}"){
            //obtener contenidos similares a un contenido
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            //enviamos a capa logica
            val res = ContentLogic().getSimilar(id);

            if(res.isEmpty()){
                val response = ResponseSingle(false,"No se encontraron contenidos similares", res)
                sendJsonResponse(call, HttpStatusCode.OK, response)
            }else{
                val response = Response(true,"Contenidos similares obtenidos correctamente", res)
                sendJsonResponse(call, HttpStatusCode.OK, response)
            }
        }
        put("/{id}") {

            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            val content = call.receive<ContentModel>()
            val res = ContentLogic().update(id,content);
            if(res == 1){
                val response = ResponseSingle(true,"Contenido actualizado correctamente", res)
                sendJsonResponse(call, HttpStatusCode.OK, response)
            }else{
                val response = ResponseSingle(false,"No se encontró el contenido", res)
                sendJsonResponse(call, HttpStatusCode.NotFound, response)
            }
        }
        delete("/{id}"){

            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            val res = ContentLogic().delete(id);
            if(res == 1){
                val response = ResponseSingle(true,"Contenido eliminado correctamente", res)
                sendJsonResponse(call, HttpStatusCode.OK, response)
            }else{
                val response = ResponseSingle(false,"No se encontró el contenido", res)
                sendJsonResponse(call, HttpStatusCode.NotFound, response)
            }
        }

    }
}
