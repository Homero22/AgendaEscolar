package com.example.logica

import com.example.data.models.User
import com.example.data.repositories.Users

class UserLogic {

    //Metodo para verificar si el correo ya existe en la base de datos
    fun verificarCorreo(correo: String): Boolean {
        val user = Users.search(correo)
        if (user == null) {
            return false
        }
        return true
    }

    //Metodo para verificar si el telefono ya existe en la base de dato
    fun verificarTelefono(telefono: String): Boolean {
        val user = Users.searchPhone(telefono)
        if (user == null) {
            return false
        }
        return true
    }


    //Metodo para devolver el usuario que tiene el correo ingresado o telefono ingresado
    fun searchUser(correo: String, telefono: String): User {
        val user = Users.getUser(correo, telefono)
        return user!!
    }


}