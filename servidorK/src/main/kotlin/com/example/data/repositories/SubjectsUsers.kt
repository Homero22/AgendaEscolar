package com.example.data.repositories
import com.example.data.entities.MateriaUsuario
import com.example.data.entities.SubjectUserDAO
import com.example.data.models.SubjectUser
import org.jetbrains.exposed.sql.transactions.transaction

object SubjectsUsers : CrudRepository<SubjectUser, Int> {

    override fun getAll(limit: Int, offset:Int ) = transaction {
        val response = SubjectUserDAO.all().limit(limit, offset.toLong())
        return@transaction response.map { it.toSubjectUser() }
    }

    override fun getById(id: Int) = transaction {
        SubjectUserDAO.findById(id)?.toSubjectUser()
    }

    override fun save(entity: SubjectUser)= transaction {
        entity.id = SubjectUserDAO.new {
            idUsuario = entity.idUsuario
            idMateria = entity.idMateria
            materiaAcro = entity.materiaAcro
            materiaColor = entity.materiaColor
            profesorNombre = entity.profesorNombre
        }.id.value
        return@transaction entity
    }

    override fun update(id: Int, entity: SubjectUser): SubjectUser= transaction {
        val response = SubjectUserDAO.findById(id)?.apply {
            idUsuario = entity.idUsuario
            idMateria = entity.idMateria
            materiaAcro = entity.materiaAcro
            materiaColor = entity.materiaColor
            profesorNombre = entity.profesorNombre
        }?.toSubjectUser()
        return@transaction response!!
    }

    override fun delete(id: Int) = transaction {
        val subju = SubjectUserDAO.findById(id) ?: return@transaction
        subju.delete()
    }
    fun isEmpty()= transaction {
        return@transaction SubjectUserDAO.all().empty()
    }
    //funcion para comprobar si existe una materia
    fun existSubject(idMateria: Int)= transaction {
        val response = SubjectUserDAO.find { MateriaUsuario.idMateria eq idMateria }
        return@transaction response
    }

}