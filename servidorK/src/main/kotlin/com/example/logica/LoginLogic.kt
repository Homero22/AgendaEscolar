package com.example.logica

import com.example.data.models.LoginRequest
import com.example.data.models.User
import com.example.data.repositories.Notes
import com.example.data.repositories.cGenerica

class LoginLogic {

    val obj = cGenerica<LoginRequest>()


    fun login(loginRequest: LoginRequest): String {

        //VERIFICAR QUE el correo exista
        val respuesta =  obj.gSearch(loginRequest, loginRequest.email) as User

        if(respuesta == null){
            return "NO EXISTE"
        }
        return if(respuesta.estado == "ACTIVO"){
            //compruebo que la contraseña sea correcta
            if(respuesta.contrasena == loginRequest.password){
                "CORRECTO"
            }else{
                "INCORRECTO"
            }
        } else{
            "INACTIVO"
        }

    }


}