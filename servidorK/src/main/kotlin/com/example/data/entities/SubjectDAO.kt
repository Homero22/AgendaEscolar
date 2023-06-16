package com.example.data.entities

import com.example.data.models.Subject
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable


object Subjects: IntIdTable("tb_materia"){
    val nombre = varchar("str_materia_nombre", 255)
    val iduser = long("int_usuario_id").references(Users.id)
    val materiaAcro = varchar("str_materia_acro", 255)
    val materiaColor = varchar("str_materia_color", 255)
    val profesorNombre = varchar("str_nombre_profesor", 255)
}
class SubjectDAO (id: EntityID<Int>) : IntEntity(id){
    companion object : IntEntityClass<SubjectDAO>(Subjects)
    var nombre by Subjects.nombre
    var idUser by Subjects.iduser
    var materiaAcro by Subjects.materiaAcro
    var materiaColor by Subjects.materiaColor
    var profesorNombre by Subjects.profesorNombre


    fun toSubject(): Subject {
        return Subject(
            id.value,
            idUser,
            nombre,
            materiaAcro,
            materiaColor,
            profesorNombre

        )
    }
}