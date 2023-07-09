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

     /* intercept(ApplicationCallPipeline.Call){

            if (call.request.uri == "/login") {
                proceed() // Continuar con el procesamiento de la petición sin verificar el token
                return@intercept
            }
            //comprobar si tiene un token en la cookie
            if(call.request.cookies["token"] == null){
                //si no tiene tolen enviar una respuesta que debe iniciar sesion
                call.respondText("Debe iniciar sesion")
            }

            //Obtener el token de la cookie
            val token = call.request.cookies["token"]
            //envio a la capa logica- security
            val res = Token().VerificarToken(token.toString())
            if(res){
                //Si el token es valido se continua con la peticion
                proceed()
            }else{
                //Si el token no es valido se envia un mensaje de error
                call.respondText("Token inválido, Intente iniciar sesión nuevamente")
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




    }

}
