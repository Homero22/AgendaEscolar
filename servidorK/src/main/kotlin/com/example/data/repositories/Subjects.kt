package com.example.data.repositories

import com.example.data.entities.*
import com.example.data.entities.Homeworks
import com.example.data.entities.Notes
import com.example.data.entities.Subjects
import com.example.data.models.Note
import com.example.data.models.Subject
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction

object Subjects : CrudRepository<Subject, Int> () {
    override fun getAll(limit: Int, offset: Int): List<Subject> = transaction {
        val response = SubjectDAO.all().limit(limit, offset.toLong())
        return@transaction response.map { it.toSubject() }

    }
    fun getAll() = transaction {
        val response = SubjectDAO.all()
        return@transaction response.map { it.toSubject() }
    }

    override fun getById(id: Int) = transaction {
       //debo devolver las materias de dado el id del usuario
        val response = SubjectDAO.findById(id)?.toSubject()
        return@transaction response
    }
    fun getByIdUser (id:Long):List<Any> = transaction {
        val response = Subjects
            .select({ Subjects.iduser eq id })
            .map {
                mapOf(
                    "id" to it[Subjects.id].value,
                    "nombre" to it[Subjects.nombre],
                    "materiaAcro" to it[Subjects.materiaAcro],
                    "materiaColor" to it[Subjects.materiaColor],
                    "profesorNombre" to it[Subjects.profesorNombre]
                )
            }
        return@transaction response
    }


    override fun save(entity: Subject) = transaction {
        val response = SubjectDAO.new {
            nombre = entity.nombre
            idUser = entity.idUser
            materiaAcro = entity.materiaAcro
            materiaColor = entity.materiaColor
            profesorNombre = entity.profesorNombre
        }
        return@transaction response.toSubject()
    }

    override fun update(id: Int, entity: Subject): Subject = transaction {
        val response = SubjectDAO.findById(id)?.apply {
            nombre = entity.nombre
            profesorNombre = entity.profesorNombre
            materiaAcro = entity.materiaAcro
            materiaColor = entity.materiaColor
        }?.toSubject()
        return@transaction response!!
    }

    override fun delete(id: Int): Any = transaction {
      //Elimino en cascada horarios y apuntes y tareas relacionados con esta materia y luego la materia
        NotesDAO.find { Notes.idMateria eq id }.forEach {
            NotesDAO.findById(it.id.value)?.delete()
        }
        ScheduleDAO.find { Horarios.idMateria eq id }.forEach {
            ScheduleDAO.findById(it.id.value)?.delete()
        }
        HomeworkDAO.find{ Homeworks.idMateria eq id }.forEach {
            HomeworkDAO.findById(it.id.value)?.delete()
        }
        val response = SubjectDAO.findById(id)?.delete()
        return@transaction response!!
    }

    //funcion para obtener el nombre de la materia
    fun search(nombre: String): Int = transaction {
        val res = SubjectDAO.find { Subjects.nombre eq nombre }.toList()
        if (res.isEmpty()) {
            return@transaction 0
        } else {
            return@transaction 1
        }
    }
    fun getTotal():Long = transaction {
        return@transaction SubjectDAO.count()
    }

}
