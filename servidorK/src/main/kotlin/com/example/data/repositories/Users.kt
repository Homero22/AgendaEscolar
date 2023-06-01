package com.example.data.repositories

import com.example.data.entities.Users
import com.example.data.entities.UsersDAO
import com.example.data.models.User
import org.jetbrains.exposed.sql.transactions.transaction


object Users : CrudRepository<User, Int> {
   override fun getAll(limit:Int, offset:Int): List<User> = transaction{
        val response = UsersDAO.all().limit(limit, offset.toLong())
        return@transaction response.map { it.toUser() }
    }
   override fun getById(id: Int) = transaction {
       return@transaction UsersDAO.findById(id.toLong())?.toUser()
   }
   override fun save(entity: User) = transaction{
        val response = UsersDAO.new {
            nombre= entity.nombre
            apellido = entity.apellido
            rol = entity.rol
            telefono = entity.telefono
            correo = entity.correo
            contrasena = entity.contrasena
            paisId = entity.paisId
            nivelEstudio = entity.nivelEstudio
            estado = entity.estado
            fechaCreacion = java.time.LocalDateTime.now()
        }
        return@transaction response.toUser()
    }

   override fun update(id:Int, entity: User): User = transaction{
        val response = UsersDAO.findById(id.toLong())?.apply {
            nombre= entity.nombre
            apellido = entity.apellido
            rol = entity.rol
            telefono = entity.telefono
            correo = entity.correo
            contrasena = entity.contrasena
            paisId = entity.paisId
            nivelEstudio = entity.nivelEstudio
            estado = entity.estado
        }?.toUser()
        return@transaction response!!
    }
   override fun delete(id:Int)= transaction {
       return@transaction UsersDAO.findById(id.toLong())?.delete()
   }
}