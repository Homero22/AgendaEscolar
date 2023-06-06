package com.example.services

import java.util.*
import javax.mail.Message
import javax.mail.MessagingException
import javax.mail.Session
import javax.mail.internet.InternetAddress
import javax.mail.internet.MimeMessage

class EmailSenderService {
    private val properties = Properties()
    private var password: String? = null
    private var session: Session? = null

    private fun init() {
        properties["mail.smtp.host"] = "mail.gmail.com"
        properties["mail.smtp.starttls.enable"] = "true"
        properties["mail.smtp.port"] = "25"
        properties["mail.smtp.mail.sender"] = "homero6834@gmail.com"
        properties["mail.smtp.user"] = "usuario"
        properties["mail.smtp.auth"] = "true"

        session = Session.getDefaultInstance(properties)
    }

    fun sendEmail() {
        init()
        try {
            val message = MimeMessage(session)
            message.setFrom(InternetAddress(properties["mail.smtp.mail.sender"] as String))
            message.setRecipient(Message.RecipientType.TO, InternetAddress("receptor@gmail.com"))
            message.subject = "Prueba"
            message.setText("Texto")
            val t = session!!.getTransport("smtp")
            t.connect(properties["mail.smtp.user"] as String, "password")
            t.sendMessage(message, message.allRecipients)
            t.close()
        } catch (me: MessagingException) {
            println("Error al enviar el mensaje")
        }
    }
}
