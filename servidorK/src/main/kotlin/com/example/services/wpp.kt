package com.example.services

import com.twilio.Twilio
import com.twilio.rest.api.v2010.account.Message
import com.twilio.type.PhoneNumber


object Wpp {
    // Encuentra tu Account SID y Auth Token en twilio.com/console
    // y establece las variables de entorno. Consulta http://twil.io/secure
    const val ACCOUNT_SID = "ACe1929c2a78f7ca7792025b49a778fce7"
    const val AUTH_TOKEN = "aee73a165eb781563eaf04b028c4f854"

    fun enviarWpp() {
        try {
            Twilio.init(ACCOUNT_SID, AUTH_TOKEN)
            val message = Message.creator(
                PhoneNumber("whatsapp:+593998371874"),
                PhoneNumber("whatsapp:+14155238886"),
                "tE AMO TE QUIERESC CASAR CONMIGO!"
            ).create()

            println(message.sid)
        } catch (
            cause: Throwable
        ) {
            println(cause.message ?: "Error desconocido")

        }
    }

}
