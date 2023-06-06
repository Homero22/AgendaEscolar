package com.example.logica

import com.example.data.repositories.Users
import com.example.services.sendEmail

class recuperarContrasena {

    //Metodos recuperarContrasena
    fun recoverPassword(correo: String): String? {

        //Verificamos que el email que se envio es valido usando la funcion search de la clase Users
        val user = Users.search(correo)
        if (user == null) {
            return "El correo no existe"
        }
        else{
            // se declara el contenido del correo, destinatario, asunto y cuerpo
            val destinatario = correo
            val asunto = "Recuperación de contraseña"
            val cuerpo = "Hola ${user.nombre} ${user.apellido},\n\n" +
                    "Tu contraseña es: ${user.contrasena}\n\n" +
                    "Gracias por usar nuestra aplicación.\n\n" +
                    "Atentamente,\n" +
                    "Equipo de desarrollo de la aplicación ClassBuddy"

            sendEmail(destinatario, asunto, cuerpo)
            return "Correo enviado correctamente"
        }

    }
}