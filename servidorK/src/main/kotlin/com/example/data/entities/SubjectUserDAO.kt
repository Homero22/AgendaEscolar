package com.example.data.entities

import com.example.data.models.SubjectUser
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

object MateriaUsuario : IntIdTable("tb_usuario_materia") {
    val idUsuario = varchar("int_usuario_id ", 255).uniqueIndex()
    val idMateria = varchar("nt_materia_id", 255).uniqueIndex()
    val materiaAcro = varchar("str_materia_acro", 255)
    val materiaColor = varchar("str_materia_color", 255)
    val profesorNombre = varchar("str_nombre_profesor", 255)

}
//clase que mapea la tabla de horario
class SubjectUserDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<CountryDAO>(Horario)
    var idUsuario by MateriaUsuario.idUsuario
    var idMateria by MateriaUsuario.idMateria
    var materiaAcro by MateriaUsuario.materiaAcro
    var materiaColor by MateriaUsuario.materiaColor
    var profesorNombre by MateriaUsuario.profesorNombre
    fun toSubjectUser():SubjectUser{
        return SubjectUser(
            id.value,
            idMateria,
            materiaAcro,
            materiaAcro,
            materiaColor,
            profesorNombre
        )
    }
}