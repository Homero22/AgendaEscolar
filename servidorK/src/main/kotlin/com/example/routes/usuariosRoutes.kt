package com.example.routes
import com.example.models.Usuario
import com.example.repositories.UsuarioDAO
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*



fun Route.usuariosRouting(){

    route("/usuarios"){

        post {
            val usuario = call.receive<Usuario>()
            val nuevoUsuario = UsuarioDAO.crearUsuario(usuario)
            call.respond(HttpStatusCode.Created, nuevoUsuario)
        }
    }

}