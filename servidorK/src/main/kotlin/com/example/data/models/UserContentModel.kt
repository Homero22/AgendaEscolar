package com.example.data.models

import kotlinx.serialization.Serializable


@Serializable
data class UserContentModel (
    val id: Long = 0L,
    val idUser: Long,
    val idContent: Int,
)

