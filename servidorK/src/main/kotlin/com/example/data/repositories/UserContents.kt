package com.example.data.repositories


import com.example.data.entities.UserContent
import com.example.data.entities.UserContentDAO

import com.example.data.models.UserContentModel
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.transactions.transaction
import kotlinx.serialization.Serializable

object UserContents : CrudRepository<UserContentModel, Int>(){
    override fun getAll(limit: Int, offset: Int): List<UserContentModel> {
        val response = UserContentDAO.all().limit(limit, offset.toLong())
        return response.map { it.toUserContent() }
    }
    fun getAll() = UserContentDAO.all().map { it.toUserContent() }

    override fun delete(id: Int) = transaction {
        UserContentDAO.findById(id.toLong())?.delete()
        return@transaction
    }
    fun eliminarGuardado(id:Int)= transaction {
     return@transaction UserContentDAO.findById(id.toLong())?.delete()
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
        //de esta lista , extraer la informacion en base al idContent de response
        val lista = response.map { it.toUserContent() }
        val lista2 = mutableListOf<Any>()
        val lista3 = mutableListOf<ContentModel2>()
        for (i in lista){
            val res = Contents.getData(i.idContent)
            //mapear la lista de res a una lista de ContentModel2
            val res2 = ContentModel2(
                i.id,
                i.idContent,
                res.idApunte,
                res.contenido,
                res.estado,
                res.puntuacion,
                res.idUser,
                res.categoria,
                res.titulo,
            )
            lista3.add(res2)

        }
        return@transaction lista3

    }
}
@Serializable
data class ContentModel2(
    val idUserContent: Long,
    val idContent: Int,
    val idApunte: Long,
    val contenido: String,
    val estado: String,
    val puntuacion: Int,
    val idUser: Long,
    val categoria: String,
    val titulo: String,
)


/*
        return@transaction mapOf(
            "idContent" to response?.get(Contents.id)?.value,
            "contenido" to response?.get(Contents.contenido),
            "idApunte" to response?.get(Contents.idApunte),
            "idUser" to response?.get(Contents.idUser),
            "puntuacion" to response?.get(Contents.puntuacion),
            "estado" to response?.get(Contents.estado),
            "categoria" to response?.get(Contents.categoria),
            "titulo" to response?.get(Notes.apunteTitulo),
        )
 */
@Serializable
data class DataContent(
    val idContent: Int,
    val contenido: String,
    val idApunte: Long,
    val idUser: Long,
    val puntuacion: Int,
    val estado: String,
    val categoria: String,
    val titulo: String,

)

