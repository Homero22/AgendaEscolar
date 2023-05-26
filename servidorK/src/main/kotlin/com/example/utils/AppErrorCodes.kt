package com.example.utils

enum class ErrorCode (val message: String){
    INVALID_USER("Objeto de usuario inválido. Verifique los valores json."),
    EMAIL_EXISTS("El email ya está registrado."),
    DATABASE_ERROR("Error en la base de datos.")
}