package com.example.data.repositories

import com.example.data.models.Homework
import com.example.data.entities.HomeworkDAO
import org.jetbrains.exposed.sql.transactions.transaction
/*
import org.jetbrains.exposed.sql.`java-time`.datetime
import org.jetbrains.exposed.sql.`java-time`.timestamp
import java.sql.Timestamp
*/

object Homeworks: CrudRepository<Homework, Int> {
    //funcion para obtener todas las tareas
    override fun getAll(limit: Int, offset: Int): List<Homework> = transaction{
        //Imprimer los parámetros de la funcion
        println(limit)
        print(offset)

        val response = HomeworkDAO.all().limit(limit, offset.toLong())
        return@transaction response.map { it.toHomework() }
    }

    //funcion para obtener tarea por id
    override fun getById(id: Int) = transaction {
        return@transaction HomeworkDAO.findById(id.toLong())?.toHomework()
    }

    //funcion para guardar tarea
    override fun save(entity: Homework) = transaction{
        val response = HomeworkDAO.new {
            usuarioMateria = entity.usuarioMateria
            tareaTitulo = entity.tareaTitulo
            tareaDescripcion = entity.tareaDescripcion
            fechaCreacion = java.time.LocalDateTime.now()
            fechaFin = java.time.LocalDateTime.parse(entity.fechaFin)
            //fechaFin = Timestamp.valueOf(entity.fechaFin)
            tareaEstado = entity.tareaEstado
            tareaRecordatorio = java.time.LocalTime.parse(entity.tareaRecordatorio)
        }
        return@transaction response.toHomework()
    }

    //funcion para actualizar tarea
    override fun update(id:Int, entity: Homework): Homework = transaction{
        val response = HomeworkDAO.findById(id.toLong())?.apply {
            usuarioMateria = entity.usuarioMateria
            tareaTitulo = entity.tareaTitulo
            tareaDescripcion = entity.tareaDescripcion
            fechaCreacion = java.time.LocalDateTime.now()
            fechaFin = java.time.LocalDateTime.parse(entity.fechaFin)
            tareaEstado = entity.tareaEstado
            tareaRecordatorio = java.time.LocalTime.parse(entity.tareaRecordatorio)
        }?.toHomework()
        return@transaction response!!
    }

    //funcion para eliminar tarea
    /*
    override fun delete(id:Int)= transaction {
        return@transaction HomeworkDAO.findById(id.toLong())?.delete()
    }
    */
    //funcion para un eliminado logico
    override fun delete(id:Int)= transaction {
        val homework = HomeworkDAO.findById(id.toLong())?:return@transaction
        homework.apply {
            tareaEstado = "INACTIVO"
        }
        return@transaction
    }
}