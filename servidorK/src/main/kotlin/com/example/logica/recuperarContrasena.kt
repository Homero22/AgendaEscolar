package com.example.logica

import com.example.data.repositories.Users

class recuperarContrasena {

    val keyGMAIL = "yoykktmqdtkqfbtk"
    val userName = "u2d.8bits@gmail.com"



    //Metodos recuperarContrasena
    fun recuperarContrasena(correo: String): String? {

        //Verificamos que el email que se envio es valido usando la funcion search de la clase Users
        val user = Users.search(correo)

        //Llamamos a la funcion getContrasena de la clase Users
        val contrasena = com.example.data.repositories.Users.getContrasena(correo)

        //Enviamos un correo electronico con la contrasena
        //sendEmail(correo, contrasena)

        return contrasena
    }


}