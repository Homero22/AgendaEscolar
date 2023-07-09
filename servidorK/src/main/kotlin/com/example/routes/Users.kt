package com.example.routes

import com.example.data.models.User
import com.example.data.repositories.Users
import com.example.logica.UserLogic
import com.example.utils.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.routing.*


fun Route.usuariosRouting() {

    route("/users") {
        //GET /users



        get {
            try {


                //Obtenemos el limite de usuarios a mostrar
                val limit = call.parameters["limit"]?.toIntOrNull() ?: 10
                //Obtenemos el offset de usuarios a mostrar
                val offset = call.parameters["offset"]?.toIntOrNull() ?: 0
                //Lógica
                val u = UserLogic().getAll(limit, offset);
                if(u.isNotEmpty()){
                    val response = Response(true, "Usuarios obtenidos correctamente", u)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = ResponseEmpty(false, "No existen usuarios", emptyList())
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }
            }catch (e: Throwable){
                val errorResponse = ErrorResponse(false, e.message ?: "Error desconocido")
                sendJsonResponse(call, HttpStatusCode.BadRequest, errorResponse)
            }

        }

        post {
            try{
                val user = call.receive<User>()
                val valido = UserLogic().insertarUsuario(user)
                if (valido) {
                    val response = ResponseSingle(true, "Usuario creado correctamente", user)
                    sendJsonResponse(call, HttpStatusCode.Created, response)
                } else {
                    val response = ResponseEmpty(
                        false,
                        "Correo o teléfono ya registrados. Verifique los datos ingresados",
                        emptyList()
                    )
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }
            }
            catch (e: Throwable){
                val errorResponse = ErrorResponse(false, e.message ?: "Error desconocido")
                sendJsonResponse(call, HttpStatusCode.BadRequest, errorResponse)
            }
        }

        get("/{id}") {
            //Obtenemos el id del usuario a buscar
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            try {
                //Lógica
                val user = UserLogic().getById(id)
                if(user != null) {
                    val response = ResponseSingle(true, "Usuario obtenido correctamente", user)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                } else {
                    val response = Response(false, "Usuario no encontrado", emptyList())
                    sendJsonResponse(call, HttpStatusCode.BadRequest, response)
                }
            }catch (e: Throwable){
                val errorResponse = ErrorResponse(false, e.message ?: "Error desconocido")
                // Envia la respuesta JSON de error en el catch
                sendJsonResponse(call, HttpStatusCode.BadRequest, errorResponse)
            }

        }
        get("/total"){
            try {
                val total = UserLogic().getTotal(1)
                val response = ResponseSingle(true, "Total de usuarios", total)
                sendJsonResponse(call, HttpStatusCode.OK, response)
            }catch (e: Throwable){
                val errorResponse = ErrorResponse(false, e.message ?: "Error desconocido")
                // Envia la respuesta JSON de error en el catch
                sendJsonResponse(call, HttpStatusCode.BadRequest, errorResponse)
            }
        }
        get("/anio/{anio}"){
            //Obtenemos el anio del usuario a buscar
            val anio = call.parameters["anio"]?.toIntOrNull() ?: 0
            try {
                val userA = UserLogic().getByAnio(anio)
                if (userA.isNotEmpty()) {
                    val response = ResponseSingle(true, "Cantidad de usuarios obtenido correctamente", userA)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                } else {
                    val response = Response(false, "Cantidad de usuarios no encontrados", emptyList())
                    sendJsonResponse(call, HttpStatusCode.NotFound, response)
                }
            }catch (e: Throwable){
                val errorResponse = ErrorResponse(false, e.message ?: "Error desconocido")
                sendJsonResponse(call, HttpStatusCode.BadRequest, errorResponse)
            }

        }
        get ("/total/admins"){
            try {
                //Lógica
                val total = UserLogic().getTotal(2)
                val response = ResponseSingle(true, "Total de usuarios obtenido correctamente", total)
                sendJsonResponse(call, HttpStatusCode.OK, response)
            }catch (e: Throwable){
                val errorResponse = ErrorResponse(false, e.message ?: "Error desconocido")
                // Envia la respuesta JSON de error en el catch
                sendJsonResponse(call, HttpStatusCode.BadRequest, errorResponse)
            }
        }
        put("/{id}") {
            //Obtenemos el id del usuario a actualizar
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            //Obtenemos el usuario a actualizar
            val user = call.receive<User>()
            //Actualizamos el usuario
            try {
               //Enviamos capa logica
                val updUser = UserLogic().updateUser(id, user)
                if (updUser ==  1) {
                    val response = ResponseSingle(true, "Usuario actualizado correctamente", updUser)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                } else {
                    val response = Response(false, "Usuario no encontrado", emptyList())
                    sendJsonResponse(call, HttpStatusCode.BadRequest, response)
                }
            }catch (
                e: Throwable
            ){
                val errorResponse = ErrorResponse(false, e.message ?: "Error desconocido")
                // Envia la respuesta JSON de error en el catch
                sendJsonResponse(call, HttpStatusCode.BadRequest, errorResponse)
            }

        }
        delete ("/{id}"){
            //Obtenemos el id del usuario a eliminar
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            //Eliminamos el usuario
            try {
                when (UserLogic().delete(id)) {
                    1 -> {
                        val response = ResponseSimple(true, "El estado del Usuario se ha cambiado a Inactivo")
                        sendJsonResponse(call, HttpStatusCode.OK, response)
                    }
                    2 -> {
                        val response = ResponseSimple(true, "El estado del Usuario se ha cambiado a Activo")
                        sendJsonResponse(call, HttpStatusCode.OK, response)
                    }
                    else -> {
                        val response = ResponseSimple(false, "No se ha encontrado al Usuario")
                        sendJsonResponse(call, HttpStatusCode.NotFound, response)
                    }
                }
            }catch (
                e: Throwable
            ){
                val errorResponse = ErrorResponse(false, e.message ?: "Error desconocido")
                sendJsonResponse(call, HttpStatusCode.BadRequest, errorResponse)
            }
        }
        get("/administradores"){
            try {
                val limit = call.parameters["limit"]?.toIntOrNull() ?: 10
                val offset = call.parameters["offset"]?.toIntOrNull() ?: 0
                val userAdmin = UserLogic().getAdmins(limit, offset)
                if (userAdmin.isNotEmpty()) {
                    val response = ResponseSingle(true, "Administradores obtenidos correctamente", userAdmin)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                } else {
                    val response = Response(false, "Administradores no encontrados", emptyList())
                    sendJsonResponse(call, HttpStatusCode.NotFound, response)
                }
            }catch (e: Throwable){
                val errorResponse = ErrorResponse(false, e.message ?: "Error desconocido")
                // Envia la respuesta JSON de error en el catch
                sendJsonResponse(call, HttpStatusCode.BadRequest, errorResponse)
            }

        }
    }


}