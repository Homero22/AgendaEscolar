package com.example.data.repositories
import com.example.data.entities.Countries
import com.example.data.entities.Users
import com.example.data.entities.UsersDAO
import com.example.data.models.User
import org.jetbrains.exposed.sql.count
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction


object Users : CrudRepository<User, Int>() {

    //loguin con email and password
    fun searchEmail(email: String): User? = transaction {
        return@transaction UsersDAO.find { Users.correo eq  email }.singleOrNull()?.toUser()
    }


    //verificar que el numero de telefono no este registrado
    fun searchPhone(telefono: String): User? = transaction {
        return@transaction UsersDAO.find { Users.telefono eq  telefono }.singleOrNull()?.toUser()
    }

    //funcion para obtener todos los usuarios
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
   override fun delete(id:Int): Any = transaction {
        val user = UsersDAO.findById(id.toLong())?:return@transaction
        user.apply {
            estado = "INACTIVO"
        }
        return@transaction
    }
    //Funcion para devolver contraseña de usuario dado un correo
    fun getContrasena(correo: String): String? = transaction {
        return@transaction UsersDAO.find { Users.correo eq correo }.firstOrNull()?.contrasena
    }

    //Funcion para devolver los datos de un usuario dado un correo o telefono
    fun getUser(correo: String, telefono: String): User? = transaction {
        val userEmail = UsersDAO.find { Users.correo eq correo }.singleOrNull()?.toUser()
        val userPhone = UsersDAO.find { Users.telefono eq telefono }.singleOrNull()?.toUser()
        if ((userEmail != null) || (userPhone != null)) {
            //retornamos todo el usuario que tiene el correo ingresado o telefono ingresado
            return@transaction userEmail ?: userPhone
        }
        return@transaction null
    }

    fun usuariosPais():List<Any> = transaction {

        val response = (Users innerJoin Countries )
            .slice(Countries.nombre,Countries.acronimo, Users.id.count())
            .selectAll().groupBy(Countries.nombre,Countries.acronimo)
            .map{
                mapOf(
                    "pais" to it[Countries.nombre],
                    "acronimo" to it[Countries.acronimo],
                    "cantidadadrgn vb" to it[Users.id.count()]
                )
            }
        return@transaction response
    }

}



