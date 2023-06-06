package com.example.services

import javax.mail.*
import javax.mail.internet.InternetAddress
import javax.mail.internet.MimeMessage

fun sendEmail(to: String, subject: String, body: String) {

    val keyGMAIL = "yoykktmqdtkqfbtk"
    val userName = "u2d.8bits@gmail.com"

    val properties = System.getProperties()

    properties["mail.smtp.host"] = "smtp.gmail.com" // Reemplaza con tu servidor SMTP
    properties["mail.smtp.port"] = "587" // Reemplaza con el puerto adecuado
    properties["mail.smtp.auth"] = "true"
    properties["mail.smtp.starttls.enable"] = "true"

    val session = Session.getInstance(properties, object : Authenticator() {
        override fun getPasswordAuthentication(): PasswordAuthentication {
            return PasswordAuthentication(userName, keyGMAIL) // Reemplaza con tus credenciales de correo electrónico
        }
    })

    try {
        val message = MimeMessage(session)
        message.setFrom(InternetAddress(userName)) // Reemplaza con tu dirección de correo electrónico
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to))
        message.subject = subject
        message.setText(body)

        Transport.send(message)
        println("Correo electrónico enviado exitosamente.")
    } catch (e: MessagingException) {
        e.printStackTrace()
    }
}