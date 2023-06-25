package com.example.data.models

import kotlinx.serialization.Serializable

@Serializable
data class Note(
    var id: Int,
    var idUser: Long,
    var idMateria: Int,
    var apunteTitulo: String,
    var apunteNotasClase: String,
    var apunteIdeas: String,
    var apunteResumen: String,
    var apunteRecordatorio: String,
    var fechaCreacion: String,
)