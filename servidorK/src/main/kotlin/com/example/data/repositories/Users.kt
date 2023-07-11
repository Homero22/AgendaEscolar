package com.example.data.repositories
import com.example.data.entities.Countries
import com.example.data.entities.Users
import com.example.data.entities.UsersDAO
import com.example.data.models.User
import com.example.data.models.reportes.usuariosPorMes
import org.jetbrains.exposed.sql.SortOrder
import org.jetbrains.exposed.sql.count
import org.jetbrains.exposed.sql.or
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction


object Users : CrudRepository<User, Int>() {

    //loguin con email and password
    fun searchEmail(email: String): User? = transaction {
        return@transaction UsersDAO.find { Users.correo eq  email }.singleOrNull()?.toUser() // Si no encuentra nada devuelve null
    }
    fun getBySearch(search: String): List<User> = transaction {
        //buscar por nombre o apellido o correo
        val response = UsersDAO.find { (Users.nombre like "%$search%") or (Users.apellido like "%$search%") or (Users.correo like "%$search%") }
        return@transaction response.map { it.toUser() }
    }

    //verificar que el numero de telefono no este registrado
    fun searchPhone(telefono: String): User? = transaction {
        return@transaction UsersDAO.find { Users.telefono eq  telefono }.singleOrNull()?.toUser()
    }

    //funcion para obtener todos los usuarios
   override fun getAll(limit:Int, offset:Int): List<User> = transaction{
        val response = UsersDAO.all().limit(limit, offset.toLong())
            .orderBy(Pair(Users.nombre, SortOrder.ASC))
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
        val user = UsersDAO.findById(id.toLong())?.delete()
        return@transaction user!!
   }
    fun eliminadoLogico(id : Int, valor:String): User = transaction {
        val response = UsersDAO.findById(id.toLong())?.apply {
            estado = valor
        }?.toUser()
        return@transaction response!!
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
                    "cantidad" to it[Users.id.count()]
                )
            }
        return@transaction response
    }

    fun getTotal(identificador : Int): Long = transaction {
            if(identificador == 1) {
                //cantidad usuarios sin rol administrador
                return@transaction UsersDAO.all().count { it.rol != "ADMINISTRADOR" }
                    .toLong()
            }else {
                //cantidad usuarios con rol administrador
                return@transaction UsersDAO.all().count { it.rol == "ADMINISTRADOR" }
                    .toLong()
            }
    }
    //funcion para obtener los años que esta en fechaCreacion
    fun getAllAnios(): List<Int> = transaction {
        //obtener todos los años de fechaCreacion sin repetir
        return@transaction UsersDAO.all().map<UsersDAO, Int> { it.fechaCreacion.year }.distinct<Int>()
    }
    //funcion para obtener la cantidad de usuarios por mes y año
    fun getUsuariosPorMes(anio: Int): List<usuariosPorMes> = transaction {
        //obtener la cantidad de usuarios por mes y año
        return@transaction UsersDAO.all().filter<UsersDAO> { it.fechaCreacion.year == anio }
            .groupBy<UsersDAO, Int> { it.fechaCreacion.monthValue }
            .map<Int, List<UsersDAO>, usuariosPorMes> { usuariosPorMes(it.key, it.value.count<UsersDAO>()) }

    }
    //funcion que devuelve todos los usuarios con rol administrador
    fun getAdministradores(limit: Int, offset: Int) :List<Any> = transaction {
        val response = UsersDAO.find { Users.rol eq "ADMINISTRADOR" }.limit(limit, offset.toLong())
            .orderBy(Pair(Users.estado, SortOrder.ASC))

        return@transaction response.map { it.toUser() }
    }

}



