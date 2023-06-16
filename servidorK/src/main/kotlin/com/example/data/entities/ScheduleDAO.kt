package com.example.data.entities

import com.example.data.models.Schedule
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.javatime.time

object Horarios : IntIdTable("tb_horario") {
    val idMateria = integer("int_materia_id").references(Subjects.id)
    val idUser = long("int_usuario_id").references(Users.id)
    val hora_inicio = time("time_hora_inicio")
    val hora_fin = time("time_hora_fin")
    val dia = varchar("str_dia", 255)
}
//clase que mapea la tabla de horario
class ScheduleDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<ScheduleDAO>(Horarios)
    var idMateria by Horarios.idMateria
    var idUser by Horarios.idUser
    var hora_inicio by Horarios.hora_inicio
    var hora_fin by Horarios.hora_fin
    var dia by Horarios.dia
    fun toSchedule():Schedule{
        return Schedule(
            id.value,
            idMateria,
            idUser,
            hora_inicio.toString(),
            hora_fin.toString(),
            dia
        )
    }

}
