package com.example.data.entities

import com.example.data.entities.Homeworks.references
import com.example.data.models.Schedule
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.javatime.time

object Horarios : IntIdTable("tb_horario") {
    val usuarioMateria = integer("int_usuario_materia_id").references(MateriaUsuario.id)
    val hora_inicio = time("time_hora_inicio")
    val hora_fin = time("time_hora_fin")
    val dia = varchar("str_dia", 255)
}
//clase que mapea la tabla de horario
class ScheduleDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<ScheduleDAO>(Horarios)
    var usuarioMateria by Horarios.usuarioMateria
    var hora_inicio by Horarios.hora_inicio
    var hora_fin by Horarios.hora_fin
    var dia by Horarios.dia
    fun toSchedule():Schedule{
        return Schedule(
            id.value,
            usuarioMateria,
            hora_inicio.toString(),
            hora_fin.toString(),
            dia
        )
    }

}
