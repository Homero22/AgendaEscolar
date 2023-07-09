package com.example.data.repositories

import com.example.data.entities.*
import com.example.data.entities.Homeworks
import com.example.data.models.Homework
import com.example.data.models.Image
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.andWhere
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime


object ImagesRepo: CrudRepository<Image, Int>() {
    //funcion para obtener todas las imagenes
    override fun getAll(limit: Int, offset: Int): List<Image> = transaction{
        val response = ImagesDAO.all().limit(limit, offset.toLong())
        return@transaction response.map { it.toImages()}
    }


    override fun getById(id: Int) = transaction {
        return@transaction ImagesDAO.findById(id.toLong())?.toImages()
    }


    override fun save(entity: Image):Image = transaction{
        println("Llega a guardar !!!!!!!!!!!!!!")
        val response = ImagesDAO.new {
            imagenes = entity.imagenes
            estado  ="ACTIVO"
            path = entity.path
        }
        return@transaction response.toImages()
    }


    override fun update(id:Int, entity: Image): Image = transaction{
        val response = ImagesDAO.findById(id.toLong())?.apply {
            imagenes = entity.imagenes
            estado = entity.estado
            path = entity.path
        }?.toImages()
        return@transaction response!!
    }

    override fun delete(id:Int)= transaction {
        ImagesDAO.findById(id.toLong())?.delete()
        return@transaction
    }

    fun getByName(name: String): Image? = transaction {
        return@transaction ImagesDAO.find { Images.path eq name }.firstOrNull()?.toImages()
    }



}