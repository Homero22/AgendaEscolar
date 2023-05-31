package com.example.routes

import com.example.data.models.Note
import com.example.data.repositories.Notes
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.notesRouting(){
    route("/notes"){
        //Get /notes
        get {
            //Obtenemos el limite de Apuntes a mostrar
            val limit = call.parameters["limit"]?.toIntOrNull() ?: 10
            //Obtenemos el offset de Apunts a mostrar
            val offset = call.parameters["offset"]?.toIntOrNull() ?: 0
            //Obtenemos los Apuntes
            call.respond(HttpStatusCode(200, "Ok"), Notes.getAll(limit, offset))
        }

        post {
            //Obtenemos el apunte a guardar
            val apunte = call.receive<Note>()
            try{
                //Guardamos el Apunte
                val response = Notes.save(apunte)
                call.respond(HttpStatusCode.Created, "Apunte Creado correctamente" )
            }catch (
                cause: Throwable
            ){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }

        get("/id"){
            //Obtenemos el id del apunte a buscar
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            try {
                //Obtenemos el apunte
                val response = Notes.getById(id)
                if (response != null){
                    call.respond(HttpStatusCode(200, "OK"), response)
                }else{
                    call.respond(HttpStatusCode.NotFound, "Apunte no Encontrado")
                }
            }catch (
                cause: Throwable
            ){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }

        put("/{id}"){
            //Obtenemos el id del Apunte a Actualizar
            val id = call.parameters["id"]?.toIntOrNull() ?:0
            //Obtenemos el apunte a actualizar
            val note = call.receive<Note>()
            //Actualizamos el apunte
            try{
                val note = Notes.getById(id)
                if(note != null){
                    val response = Notes.update(id, note)
                    call.respond(HttpStatusCode( 200, "OK"), response)
                }else{
                    call.respond(HttpStatusCode.NotFound, "Apunte no encontrado")
                }
            }catch (
                cause: Throwable
            ){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }

        delete("/{id}") {
            //Obtenemos el id del apunte a eliminar
            val id = call.parameters["id"]?.toIntOrNull() ?:0
            //Eliminamos el Apunte
            try {
                val response = Notes.delete(id)
                if (response != null){
                    call.respond(HttpStatusCode.OK, response)
                }else{
                    call.respond(HttpStatusCode.NotFound, "Apunte no encontrado :(")
                }
            }catch (
                cause: Throwable
            ){
                call.respond(HttpStatusCode.BadRequest, cause.message ?: "Error desconocido")
            }
        }

    }
}