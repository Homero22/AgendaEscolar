package com.example.data.repositories

import com.example.data.entities.HomeworkDAO
import com.example.data.entities.Homeworks
import com.example.data.entities.SubjectDAO
import com.example.data.entities.Users
import com.example.data.models.Homework
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.andWhere
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
/*
import org.jetbrains.exposed.sql.`java-time`.datetime
import org.jetbrains.exposed.sql.`java-time`.timestamp
import java.sql.Timestamp
*/

object Homeworks: CrudRepository<Homework, Int>() {
    //funcion para obtener todas las tareas
    override fun getAll(limit: Int, offset: Int): List<Homework> = transaction{
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
            idUser= entity.idUser
            idMateria = entity.idMateria
            tareaTitulo = entity.tareaTitulo
            tareaDescripcion = entity.tareaDescripcion
            fechaCreacion = java.time.LocalDateTime.now()
            fechaFin = java.time.LocalDate.parse(entity.fechaFin)
            horaEntrega = java.time.LocalTime.parse(entity.horaEntrega)
            tareaEstado = entity.tareaEstado
            tareaRecordatorio = java.time.LocalTime.parse(entity.tareaRecordatorio)
        }
        return@transaction response.toHomework()
    }

    //funcion para actualizar tarea
    override fun update(id:Int, entity: Homework): Homework = transaction{
        val response = HomeworkDAO.findById(id.toLong())?.apply {
            tareaTitulo = entity.tareaTitulo
            tareaDescripcion = entity.tareaDescripcion
            fechaCreacion = java.time.LocalDateTime.now()
            fechaFin = java.time.LocalDate.parse(entity.fechaFin)
            horaEntrega = java.time.LocalTime.parse(entity.horaEntrega)
            tareaEstado = entity.tareaEstado
            tareaRecordatorio = java.time.LocalTime.parse(entity.tareaRecordatorio)
        }?.toHomework()
        getAllByUserAndStatePendientes(entity.idUser, entity.tareaEstado)
        return@transaction response!!
    }

    override fun delete(id:Int)= transaction {
        HomeworkDAO.findById(id.toLong())?.delete()
        return@transaction
    }

    //funcion para obtener todas las tareas de un usuario
    fun getAllByUser(id: Long):List<Any> = transaction {

        val res = Homeworks
            .select { Homeworks.idUser eq id }
            .map {
                mapOf(
                    "id" to it[Homeworks.id].value,
                    "idUser" to it[Homeworks.idUser],
                    "idMateria" to it[Homeworks.idMateria],
                    "nombreMateria" to SubjectDAO.get(it[Homeworks.idMateria]).nombre,
                    "tareaTitulo" to it[Homeworks.tareaTitulo],
                    "tareaDescripcion" to it[Homeworks.tareaDescripcion],
                    "fechaCreacion" to it[Homeworks.fechaCreacion],
                    "fechaFin" to it[Homeworks.fechaFin],
                    "horaEntrega" to it[Homeworks.horaEntrega],
                    "tareaEstado" to it[Homeworks.tareaEstado],
                    "tareaRecordatorio" to it[Homeworks.tareaRecordatorio]
                )
            }
        return@transaction res
    }

    //funcion para obtener todas las tareas de un usuario dado un estado

    fun getAllByUserAndState(id: Long, state: String):List<Any> = transaction {
        val res = Homeworks
            .select({ Homeworks.idUser eq id })
            .andWhere { Homeworks.tareaEstado eq state }
            .map {
                mapOf(
                    "id" to it[Homeworks.id].value,
                    "idUser" to it[Homeworks.idUser],
                    "idMateria" to it[Homeworks.idMateria],
                    "tareaTitulo" to it[Homeworks.tareaTitulo],
                    "tareaDescripcion" to it[Homeworks.tareaDescripcion],
                    "fechaCreacion" to it[Homeworks.fechaCreacion],
                    "fechaFin" to it[Homeworks.fechaFin],
                    "horaEntrega" to it[Homeworks.horaEntrega],
                    "tareaEstado" to it[Homeworks.tareaEstado],
                    "tareaRecordatorio" to it[Homeworks.tareaRecordatorio]
                )
            }
        return@transaction res
    }

    //funcion para obtener todas las tareas pendientes de un usuario y devolver in List <Homework>


    fun getAllByUserAndStatePendientes(id: Long, state: String):List<Homework> = transaction {
        val response = HomeworkDAO.all()
            .filter { it.idUser == id.toLong() && it.tareaEstado == state }

        return@transaction response.map { it.toHomework() }
    }



}