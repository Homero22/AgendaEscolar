package com.example.data.repositories

import com.example.data.entities.SubjectDAO
import com.example.data.entities.Subjects
import com.example.data.models.Subject
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
        val subject = SubjectDAO.findById(id) ?: return@transaction
        subject.delete()
        return@transaction

    }

    //funcion para obtener el nombre de la materia
    fun search(id: Int): String = transaction {
        val response = SubjectDAO.findById(id)?.toSubject()
        return@transaction response!!.nombre
    }
}
