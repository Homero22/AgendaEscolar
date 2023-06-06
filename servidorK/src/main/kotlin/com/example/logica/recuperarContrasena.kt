package com.example.logica

import com.example.data.repositories.Users
import com.example.services.sendEmail
import org.h2.util.json.JSONObject

/*import org.json.JSONObject*/


class recuperarContrasena {

    //Metodos recuperarContrasena
    fun recoverPassword(correo: String): String? {

        //Verificamos que el email que se envio es valido usando la funcion search de la clase Users
        val user = Users.search(correo)
        if (user == null) {
            return  "El correo no existe"
        }
        else{
            // se declara el contenido del correo, destinatario, asunto y cuerpo
            //val destinatario = correo
            val asunto = "Recuperación de contraseña"
            val cuerpo = "Hola ${user.nombre} ${user.apellido},\n\n" +
                    "Tu contraseña es: ${user.contrasena}\n\n" +
                    "Gracias por usar nuestra aplicación.\n\n" +
                    "Atentamente,\n" +
                    "Equipo de desarrollo de la aplicación ClassBuddy"

             // Enviar el correo electrónico y obtener el resultado
            val enviadoExitosamente = sendEmail(correo, asunto, cuerpo)

            val message = if (enviadoExitosamente) "Correo enviado correctamente" else "Error al enviar el correo"

            return message
        }

    }


}
