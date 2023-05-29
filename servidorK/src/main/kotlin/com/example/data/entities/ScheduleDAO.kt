package com.example.data.entities

import com.example.data.models.Schedule
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

object Horario : IntIdTable("tb_horario") {
    val usuarioMateria = varchar("int_usuario_materia_id", 255).uniqueIndex()
    val hora_inicio = varchar("time_hora_inicio", 255).uniqueIndex()
    val hora_fin = varchar("time_hora_fin", 255)
    val dia = varchar("str_dia", 255)

}
//clase que mapea la tabla de horario
class ScheduleDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<CountryDAO>(Horario)
    var usuarioMateria by Horario.usuarioMateria
    var hora_inicio by Horario.hora_inicio
    var hora_fin by Horario.hora_fin
    var dia by Horario.dia
    fun toSchedule():Schedule{
        return Schedule(
            id.value,
            usuarioMateria,
            hora_inicio,
            hora_fin,
            dia
        )
    }
}