package com.example.data.entities

import com.example.data.models.SubjectUser
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

object MateriaUsuario : IntIdTable("negocio.tb_usuario_materia") {
    val idUsuario = integer("int_usuario_id").uniqueIndex()
    val idMateria = integer("int_materia_id").uniqueIndex()
    val materiaAcro = varchar("str_materia_acro", 255)
    val materiaColor = varchar("str_materia_color", 255)
    val profesorNombre = varchar("str_nombre_profesor", 255)

}
//clase que mapea la tabla de horario
class SubjectUserDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<SubjectUserDAO>(MateriaUsuario)
    var idUsuario by MateriaUsuario.idUsuario
    var idMateria by MateriaUsuario.idMateria
    var materiaAcro by MateriaUsuario.materiaAcro
    var materiaColor by MateriaUsuario.materiaColor
    var profesorNombre by MateriaUsuario.profesorNombre
    fun toSubjectUser():SubjectUser{
        return SubjectUser(
            id.value,
            idUsuario,
            idMateria,
            materiaAcro,
            materiaColor,
            profesorNombre
        )
    }
}