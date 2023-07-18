package com.example.data.entities

import com.example.data.models.UserContentModel
import org.jetbrains.exposed.dao.LongEntity
import org.jetbrains.exposed.dao.LongEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.LongIdTable


object UserContent: LongIdTable("tb_user_content"){
    val idUser = long("int_usuario_id").references(Users.id)
    val idContent = integer("int_contenido_id").references(Contents.id)
}
class UserContentDAO (id: EntityID<Long>) : LongEntity(id){
    companion object : LongEntityClass<UserContentDAO>(UserContent)
    var idUser by UserContent.idUser
    var idContent by UserContent.idContent

    fun toUserContent(): UserContentModel {
        return UserContentModel(
            id.value,
            idUser,
            idContent
        )
    }
}
/*

class UsersDAO(id: EntityID<Long>) : LongEntity(id) {
    companion object : LongEntityClass<UsersDAO>(Users)

    fun toUser():User{
        return User(
            id.value,
            nombre,
            apellido,
            rol,
            telefono,
            correo,
            contrasena,
            paisId,
            nivelEstudio,
            fechaCreacion.toString(),
            estado
        )
    }
}
 */



