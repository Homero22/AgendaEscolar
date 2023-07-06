package com.example.logica.Security

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys

class Token {
    fun VerificarToken(token: String): Boolean {
        //decodificar el token jwt
        //verificar que el token no este expirado
        //verificar que el token sea valido

        //verificar token
        val secretKey = Keys.hmacShaKeyFor("hola_mundo_de_class_buddy_ojeda_bolaños_logroño_secaira".toByteArray())
        val jwt = Jwts.parserBuilder()
            .setSigningKey(secretKey)
            .build()
            .parseClaimsJws(token)
        println(jwt.body)
return true
    }
}