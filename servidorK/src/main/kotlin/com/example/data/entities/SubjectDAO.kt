package com.example.data.entities

import com.example.data.models.Subject
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable


object Subjects: IntIdTable("negocio.tb_materia"){
    val nombre = varchar("str_materia_nombre", 255)
}
class SubjectDAO (id: EntityID<Int>) : IntEntity(id){
    companion object : IntEntityClass<SubjectDAO>(Subjects)
    var nombre by Subjects.nombre


    fun toSubject(): Subject {
        return Subject(
            id.value,
            nombre
        )
    }
}