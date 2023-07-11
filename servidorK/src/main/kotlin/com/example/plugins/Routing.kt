package com.example.plugins

import com.example.logica.Security.Token
import com.example.routes.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*


fun Application.configureRouting() {
    routing {

        //Verificar token valido que viene de una cokie
/*
        intercept(ApplicationCallPipeline.Call){
            // Verificar si la ruta es la de inicio de sesión
            if (call.request.uri == "/login") {
                proceed() // Continuar con el procesamiento de la petición sin verificar el token
                return@intercept
            }

            // interceptar los parametros para extraer el token
            val token = call.parameters["token"]

            if(token == null){
                call.respondText("Debe iniciar sesion")
                return@intercept
            }else{
                val res = Token().VerificarToken(token.toString())
                if(res){
                    //Si el token es valido se continua con la peticion
                    proceed()
                }else{
                    //Si el token no es valido se envia un mensaje de error
                    call.respondText("Token inválido, Intente iniciar sesión nuevamente")
                }
            }
        }*/


        get("/") {
            call.respondText("El servidor de classBuddy te responde")
        }
        loguinRouting()
        usuariosRouting()
        countriesRouting()
        //subjectsRouting()
        horariosRouting()
        homeworksRouting()
        notesRouting()

        recoverRouting()
        chatGptRoute()
        reportesRouting()
        aniosRouting()

        imagenesRouting()
        contentsRouting()




    }

}
