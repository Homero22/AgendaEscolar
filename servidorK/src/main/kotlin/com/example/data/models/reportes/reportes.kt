package com.example.data.models.reportes

import kotlinx.serialization.Serializable

@Serializable
data class reportes(
    val pais : String,
    val cantidad : Int
)

@Serializable
data class usuariosPorMes(
    val mes : Int,
    val cantidad : Int
)

@Serializable
data class usuariosPorNombreMes(
    val mes : String,
    val cantidad : Int
)

@Serializable
data class reporteCuadrante(
    val datos : List<usuariosPorNombreMes>
)