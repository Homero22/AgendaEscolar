package com.example.data.repositories
import com.example.data.entities.Horarios
import com.example.data.entities.ScheduleDAO
import com.example.data.models.Schedule
import mu.KotlinLogging
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.transactions.transaction

object Schedules : CrudRepository<Schedule, Int>() {
    private val logger = KotlinLogging.logger {}
    override fun getAll(limit: Int, offset: Int) = transaction {
        val response = ScheduleDAO.all().limit(limit, offset.toLong())
        return@transaction response.map { it.toSchedule()}
    }

    fun getAll() = transaction {
        val response = ScheduleDAO.all()
        return@transaction response.map { it.toSchedule()}
    }

    override fun getById(id: Int) = transaction {
        ScheduleDAO.findById(id)?.toSchedule()
    }

    override fun save(entity: Schedule)= transaction {
        entity.id = ScheduleDAO.new {
            hora_inicio = java.time.LocalTime.parse(entity.hora_inicio)
            hora_fin = java.time.LocalTime.parse(entity.hora_fin)
            dia = entity.dia
        }.id.value
        return@transaction entity
    }

    override fun update(id: Int, entity: Schedule): Schedule = transaction {
        val schedule = ScheduleDAO.findById(id) ?: throw NoSuchElementException("Schedule not found")
        schedule.apply {
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

    //funcion para comprobar que no se repita el horario
    fun checkSchedule(idMateria: Int, hora_inicio: String, hora_fin: String, dia: String): Boolean = transaction {
        val response = ScheduleDAO.find { (Horarios.idMateria eq idMateria) and (Horarios.hora_inicio eq java.time.LocalTime.parse(hora_inicio)) and (Horarios.hora_fin eq java.time.LocalTime.parse(hora_fin)) and (Horarios.dia eq dia) }
        logger.info{"HOLAAAAAAA "+response}
        return@transaction response.empty()
    }

}