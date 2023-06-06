package com.example.logica

import com.example.data.repositories.Users

class recuperarContrasena {

    //Metodos recuperarContrasena
    fun recuperarContrasena(correo: String): String? {

        //Verificamos que el email que se envio sea valido


        //Llamamos a la funcion getContrasena de la clase Users
        val contrasena = com.example.data.repositories.Users.getContrasena(correo)

        //Enviamos un correo electronico con la contrasena
        //sendEmail(correo, contrasena)

        return contrasena
    }


}