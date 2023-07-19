package com.example.data.repositories

import com.example.data.entities.ContentDAO
import com.example.data.entities.Contents
import com.example.data.models.ContentModel
import org.jetbrains.exposed.sql.transactions.transaction
import  com.example.data.entities.Notes
import com.example.data.entities.Users
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.selectAll

object Contents: CrudRepository<ContentModel, Int>() {
    override fun getAll(limit: Int, offset: Int): List<ContentModel> = transaction {
         val response = ContentDAO.all().limit(limit, offset.toLong())
            return@transaction response.map { it.toContent() }
    }
    fun getAll() = transaction {
        val response = ContentDAO.all()
        return@transaction response.map { it.toContent() }
    }



    override fun getById(id: Int) = transaction {
        return@transaction ContentDAO.findById(id)?.toContent()
    }
    fun getContentByIdApunte(id:Long) = transaction {
        //retornar el contenido dado el id del apunte
        return@transaction ContentDAO.find { Contents.idApunte eq id }.firstOrNull()?.toContent()
    }
    fun getByIdC(idApunte: Int) = transaction {
        //retornar un contenido dado el id del Apunte  idApunte si no existe retorna null
        return@transaction ContentDAO.find { Contents.idApunte eq idApunte.toLong() }.firstOrNull()?.toContent()
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

    fun getSimilar( categoria:String, limit: Int, offset: Int): List<Any> = transaction {
        //obtener los apuntes con estado publico y con la misma categoria obteniendo el titulo del apunte con inner join de Contents u Notes
        val response = (Contents innerJoin Notes  ).select { Contents.estado eq "PÚBLICO" and (Contents.categoria eq categoria) }.limit(limit, offset.toLong())
        return@transaction response.map {
            mapOf(
                "id" to it[Contents.id].value,
                "contenido" to it[Contents.contenido],
                "idApunte" to it[Contents.idApunte],
                "idUser" to it[Contents.idUser],
                "puntuacion" to it[Contents.puntuacion],
                "estado" to it[Contents.estado],
                "categoria" to it[Contents.categoria],
                "titulo" to it[Notes.apunteTitulo],
            )
        }
    }
    fun getData(id:Int)= transaction{
        //dado el id del contenido obtener el titulo del apunte y el nombre del usuario haciendo inner join de Contents y Notes y Users respectivamente
        val response = (Contents innerJoin Notes ).select { Contents.id eq id }.firstOrNull()
        return@transaction mapOf(
            "id" to response?.get(Contents.id)?.value,
            "contenido" to response?.get(Contents.contenido),
            "idApunte" to response?.get(Contents.idApunte),
            "idUser" to response?.get(Contents.idUser),
            "puntuacion" to response?.get(Contents.puntuacion),
            "estado" to response?.get(Contents.estado),
            "categoria" to response?.get(Contents.categoria),
            "titulo" to response?.get(Notes.apunteTitulo),
        )

    }
}