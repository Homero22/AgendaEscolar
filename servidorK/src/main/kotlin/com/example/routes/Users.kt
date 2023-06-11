package com.example.routes

import com.example.data.models.User
import com.example.data.repositories.Users
import com.example.data.repositories.cGenerica
import com.example.logica.UserLogic
import com.example.utils.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import java.lang.Boolean.TRUE

<<<<<<< HEAD


=======
val oUser = cGenerica<Users>();
>>>>>>> c46691cdba359dd006d72ab7ca41ad7a8489d9ff
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
                if(u!=null){
                    val response = Response(true, "Usuarios obtenidos correctamente", u)
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }else{
                    val response = ResponseEmpty(false, "No existen usuarios")
                    sendJsonResponse(call, HttpStatusCode.OK, response)
                }
            }catch (e: Throwable){
                val errorResponse = ErrorResponse(false, e.message ?: "Error desconocido")
                // Envia la respuesta JSON de error en el catch
                sendJsonResponse(call, HttpStatusCode.BadRequest, errorResponse)
            }

        }

        post {


            try{
                //Obtenemos el usuario a guardar
                val user = call.receive<User>()
                //Logica
                val valido = UserLogic().insertarUsuario(user)
                if (valido) {
                    val response = ResponseSingle(true, "Usuario creado correctamente", user)
                    sendJsonResponse(call, HttpStatusCode.Created, response)
                } else {
                    val response = ResponseEmpty(false, "Correo o teléfono ya registrados. Verifique los datos ingresados")
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
                if (user != null) {
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
        put("/{id}") {
            //Obtenemos el id del usuario a actualizar
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            //Obtenemos el usuario a actualizar
            val user = call.receive<User>()
            //Actualizamos el usuario

            try {
                val user = Users.getById(id)

                if (user != null) {
                    val udtUser = Users.update(id, user)

                    val response = ResponseSingle(true, "Usuario actualizado correctamente", udtUser)
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


                val dltUser = Users.delete(id)
                if (dltUser != null) {

                    val response = ResponseSingle(true, "Usuario eliminado correctamente", dltUser)
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
    }
    //ruta para seguridad, loguin, logout, registro


}