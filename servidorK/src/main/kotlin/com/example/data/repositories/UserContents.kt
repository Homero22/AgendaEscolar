package com.example.data.repositories


import com.example.data.entities.UserContent
import com.example.data.entities.UserContentDAO
import com.example.data.models.ContentModel

import com.example.data.models.UserContentModel
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.transactions.transaction
import com.example.data.repositories.Contents
import kotlinx.serialization.Serializable

object UserContents : CrudRepository<UserContentModel, Int>(){
    override fun getAll(limit: Int, offset: Int): List<UserContentModel> {
        val response = UserContentDAO.all().limit(limit, offset.toLong())
        return response.map { it.toUserContent() }
    }
    fun getAll() = UserContentDAO.all().map { it.toUserContent() }

    override fun delete(id: Int): Any {
        return UserContentDAO.findById(id.toLong())?.delete()?:false
    }

    override fun update(id: Int, entity: UserContentModel): UserContentModel? {
    TODO()
    }

    override fun save(entity: UserContentModel)= transaction {
        println("Llega a la funcion save de UserContents")
        val response = UserContentDAO.new {
            idUser = entity.idUser
            idContent = entity.idContent
        }
        return@transaction response.toUserContent()

    }

    override fun getById(id: Int): UserContentModel? {
        return UserContentDAO.findById(id.toLong())?.toUserContent()
    }
    fun getById(idUser:Long, idContent:Int ) = transaction {
        println("ya")
        val response = UserContentDAO.find {
            (UserContent.idUser eq idUser) and (UserContent.idContent eq  idContent)
        }
        if(response.empty()){
            return@transaction null
        }else{
            return@transaction response.first().toUserContent()
        }



    }

    fun getAllByIdUser(idUser:Long, limit: Int, offset: Int) : List<Any> = transaction {
        val response = UserContentDAO.find { UserContent.idUser eq idUser }.limit(limit, offset.toLong())

        if(response.empty()){
            return@transaction emptyList<Any>()
        }else {
            //en base a la lista de UserContentModel, obtener la lista de ContentModel
            val list = response.map { it.toUserContent() }
            val list2 = mutableListOf<Any>()
            for (i in list) {
                list2.add(Contents.getById(i.idContent)!!)
            }
            //de la anterior lista quiero obtener haciendo un join con la tabla de apuntes
            val list3 = mutableListOf<Any>()
            for (i in list2) {
                list3.add(Contents.getData((i as ContentModel).id))
            }
            return@transaction list3
        }

    }
}
@Serializable
data class ContentModel2 (
    val id: Int,
    val idApunte: Long,
    val contenido: String,
    val estado: String,
    val puntuacion: Int,
    val idUser: Long,
    val categoria: String,
    val nombre: String,
    val apellido: String,
)

