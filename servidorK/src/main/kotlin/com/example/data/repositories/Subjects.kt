package com.example.data.repositories

import com.example.data.entities.SubjectDAO
import com.example.data.models.Subject
import org.jetbrains.exposed.sql.transactions.transaction

object Subjects : CrudRepository<Subject, Int> () {
    override fun getAll(limit: Int, offset: Int): List<Subject> = transaction {
        val response = SubjectDAO.all().limit(limit, offset.toLong())
        return@transaction response.map { it.toSubject() }

    }

    override fun getById(id: Int) = transaction {
        return@transaction SubjectDAO.findById(id)?.toSubject()
    }


    override fun save(entity: Subject) = transaction {
        val response = SubjectDAO.new {
            nombre = entity.nombre
        }
        return@transaction response.toSubject()
    }

    override fun update(id: Int, entity: Subject): Subject = transaction {
        val response = SubjectDAO.findById(id)?.apply {
            nombre = entity.nombre
        }?.toSubject()
        return@transaction response!!
    }

    override fun delete(id: Int): Any = transaction {
        val subject = SubjectDAO.findById(id) ?: return@transaction
        subject.delete()
        return@transaction

    }
}
