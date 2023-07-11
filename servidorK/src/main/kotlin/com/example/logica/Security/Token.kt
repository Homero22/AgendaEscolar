package com.example.logica.Security

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys

class Token {
    fun VerificarToken(token: String): Boolean {

        //verificar que el token sea válido con la clave secreta

        val secretKey = Keys.hmacShaKeyFor("hola_mundo_de_class_buddy_ojeda_bolaños_logroño_secaira".toByteArray())
        return try {
            val claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
            true
        } catch (e: Exception) {
            false
        }

    }
}