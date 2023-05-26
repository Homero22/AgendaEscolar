package com.example.data.repositories

import com.example.data.entities.UsersDAO
import com.example.data.models.User
import org.jetbrains.exposed.sql.transactions.transaction


object Users {
    fun getAll(limit:Int, offset:Long): List<User> = transaction{
        val response = UsersDAO.all().limit(limit,offset)
        return@transaction response.map { it.toUser() }
    }
    fun getById(id: Int) = transaction{
        val response = UsersDAO.findById(id.toLong())?.toUser()
        return@transaction response
    }
    fun save(user: User) = transaction{
        val response = UsersDAO.new {
            nombre= user.nombre
            apellido = user.apellido
            rol = user.rol
            telefono = user.telefono
            correo = user.correo
            contrasena = user.contrasena
            paisId = user.paisId
            nivelEstudio = user.nivelEstudio
            estado = user.estado
            fechaCreacion = java.time.LocalDateTime.now()
        }
        return@transaction response.toUser()
    }

    fun update(id:Int, user: User) = transaction{
        val response = UsersDAO.findById(id.toLong())?.apply {
            nombre= user.nombre
            apellido = user.apellido
            rol = user.rol
            telefono = user.telefono
            correo = user.correo
            contrasena = user.contrasena
            paisId = user.paisId
            nivelEstudio = user.nivelEstudio
            estado = user.estado
        }?.toUser()
        return@transaction response
    }
    fun delete(id:Int) = transaction{
        val response = UsersDAO.findById(id.toLong())?.delete()
        return@transaction response
    }
}