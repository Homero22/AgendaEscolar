package com.example.data.repositories
import com.example.data.entities.ScheduleDAO
import com.example.data.models.Schedule
import org.jetbrains.exposed.sql.transactions.transaction

object Schedules : CrudRepository<Schedule, Int>() {
    override fun getAll(limit: Int, offset: Int) = transaction {
        val response = ScheduleDAO.all().limit(limit, offset.toLong())
        return@transaction response.map { it.toSchedule()}
    }

    override fun getById(id: Int) = transaction {
        ScheduleDAO.findById(id)?.toSchedule()
    }

    override fun save(entity: Schedule)= transaction {
        entity.id = ScheduleDAO.new {
            usuarioMateria = entity.usuarioMateria
            hora_inicio = java.time.LocalTime.parse(entity.hora_inicio)
            hora_fin = java.time.LocalTime.parse(entity.hora_fin)
            dia = entity.dia
        }.id.value
        return@transaction entity
    }

    override fun update(id: Int, entity: Schedule): Schedule = transaction {
        val schedule = ScheduleDAO.findById(id) ?: throw NoSuchElementException("Schedule not found")
        schedule.apply {
            usuarioMateria = entity.usuarioMateria
            hora_inicio = java.time.LocalTime.parse(entity.hora_inicio)
            hora_fin = java.time.LocalTime.parse(entity.hora_fin)
            dia = entity.dia
        }
        schedule.toSchedule()
    }
    override fun delete(id: Int) = transaction {
        val schedule = ScheduleDAO.findById(id) ?: return@transaction
        schedule.delete()
    }

    fun isEmpty()= transaction {
        return@transaction ScheduleDAO.all().empty()
    }
}