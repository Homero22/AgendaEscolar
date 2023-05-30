package com.example.data.models

import kotlinx.serialization.Serializable

@Serializable
data class Homework (
    val id: Int,
    val usuarioMateria: Int,
    val tareaTitulo: String,
    val tareaDescripcion: String,
    val fechaCreacion: String,
    val fechaFin: String,
    val tareaEstado: String,
    val tareaRecordatorio: String,
)