package com.example.logica

import com.example.data.models.User
import com.example.data.repositories.Users
import com.example.data.repositories.cGenerica

class UserLogic {

    //Declaramos un objeto de tipo generico
    val obj = cGenerica<Users>()

    //Metodo para verificar si el correo ya existe en la base de datos
    fun verificarCorreo(correo: String): Boolean {
        val user = Users.searchEmail(correo)
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
    /*fun searchUser(correo: String, telefono: String): User {
        val user = Users.getUser(correo, telefono)
        return user!!
    }*/

    // Funcion para Ingresar un nuevo usuario validando que el correo y el telefono no existan en la base de datos
    fun insertarUsuario(user: User): Boolean {
        val verificarCorreo = verificarCorreo(user.correo)
        val verificarTelefono = verificarTelefono(user.telefono)
        if (!verificarCorreo && !verificarTelefono) {
            Users.save(user)
            return true
        }
        return false
    }

    fun getAll(limit:Int, offset:Int): List<User> {
        return obj.gGetAll(Users,limit,offset) as List<User>

    }

    fun getById(id: Int): User? {
        return obj.gGgetById(Users,id) as User?
    }
    //funcion para guaradar un usuario
    fun save(entity: User): User {
        return obj.gSave(Users,entity) as User
    }


}