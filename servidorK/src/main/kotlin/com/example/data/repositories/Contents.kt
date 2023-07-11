package com.example.data.repositories

import com.example.data.entities.ContentDAO
import com.example.data.entities.Contents
import com.example.data.models.ContentModel
import org.jetbrains.exposed.sql.transactions.transaction

object Contents: CrudRepository<ContentModel, Int>() {
    override fun getAll(limit: Int, offset: Int): List<ContentModel> = transaction {
         val response = ContentDAO.all().limit(limit, offset.toLong())
            return@transaction response.map { it.toContent() }
    }

    override fun getById(id: Int) = transaction {
        return@transaction ContentDAO.findById(id)?.toContent()
    }
    fun getContentByIdApunte(id:Long) = transaction {
        //retornar el contenido dado el id del apunte
        return@transaction ContentDAO.find { Contents.idApunte eq id }.firstOrNull()?.toContent()
    }
    fun getByIdC(int: Int): Int = transaction {
        val response = ContentDAO.find { Contents.id eq int }.firstOrNull()?:return@transaction -1
        return@transaction response.id.value
    }
    fun getByIdApunte(id: Long): Int = transaction {
        //retornar el id del contenido dado el id del apunte
        val response = ContentDAO.find { Contents.idApunte eq id }.firstOrNull()?:return@transaction -1
        return@transaction response.id.value
    }

    override fun save(entity: ContentModel) = transaction {
        val response = ContentDAO.new {
            contenido = entity.contenido
            idApunte = entity.idApunte
            idUser = entity.idUser
            puntuacion = entity.puntuacion
            estado = entity.estado
            categoria = entity.categoria
        }
        return@transaction response.toContent()
    }

    override fun update(id: Int, entity: ContentModel): ContentModel = transaction {
        val response = ContentDAO.findById(id)?.apply {
            contenido = entity.contenido
            idApunte = entity.idApunte
            idUser = entity.idUser
            puntuacion = entity.puntuacion
            estado = entity.estado
            categoria = entity.categoria
        }?.toContent()
        return@transaction response!!
    }

    override fun delete(id: Int): ContentModel = transaction {
        TODO()

    }
    fun eliminarContenido(id: Int)= transaction {
        //eliminar contenido dado el id
        val response = ContentDAO.findById(id)?.delete()
        return@transaction response!!

    }

    fun getSimilar( categoria:String, limit: Int, offset: Int): List<ContentModel> = transaction {
        //obtener los apuntes con estado publico y con la misma categoria
        val response = ContentDAO.all().limit(limit, offset.toLong()).filter {
            it.estado == "PÚBLICO" && it.categoria == categoria
        }
        return@transaction response.map { it.toContent() }
    }
}