package com.example.data.repositories
import com.example.data.entities.Horarios
import com.example.data.entities.ScheduleDAO
import com.example.data.entities.SubjectDAO
import com.example.data.entities.Subjects
import com.example.data.models.Schedule
import mu.KotlinLogging
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.selectAll
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
    //funcion para obtener todos los horarios de un usuario
    fun getAllByUser(id: Long):List<Any> = transaction {

        //quiero tambien hacer un join con la tabla de materias para obtener el nombre de la materia
        val res = Horarios
            .select { Horarios.idUser eq id }
            .map {
                mapOf(
                    "id" to it[Horarios.id].value,
                    "idMateria" to it[Horarios.idMateria],
                    "idUser" to it[Horarios.idUser],
                    "nombreMateria" to SubjectDAO[it[Horarios.idMateria]].nombre,
                    "hora_inicio" to it[Horarios.hora_inicio],
                    "hora_fin" to it[Horarios.hora_fin],
                    "dia" to it[Horarios.dia],
                    "acronimo" to SubjectDAO[it[Horarios.idMateria]].materiaAcro,
                    "color" to SubjectDAO[it[Horarios.idMateria]].materiaColor
                )
            }
        return@transaction res

       /* val horarios = Horarios
            .select({ Horarios.idUser eq id })
            .map {
                mapOf(
                    "id" to it[Horarios.id].value,
                    "idMateria" to it[Horarios.idMateria],
                    "idUser" to it[Horarios.idUser],

                    "hora_inicio" to it[Horarios.hora_inicio],
                    "hora_fin" to it[Horarios.hora_fin],
                    "dia" to it[Horarios.dia]
                )
            }
        return@transaction horarios  */
    }

    override fun save(entity: Schedule)= transaction {
        entity.id = ScheduleDAO.new {
            idMateria = entity.idMateria
            idUser = entity.idUser
            hora_inicio = java.time.LocalTime.parse(entity.hora_inicio)
            hora_fin = java.time.LocalTime.parse(entity.hora_fin)
            dia = entity.dia
        }.id.value
        return@transaction entity
    }

    override fun update(id: Int, entity: Schedule): Schedule = transaction {
        val schedule = ScheduleDAO.findById(id)?.apply {
            idMateria = entity.idMateria
            idUser = entity.idUser
            hora_inicio = java.time.LocalTime.parse(entity.hora_inicio)
            hora_fin = java.time.LocalTime.parse(entity.hora_fin)
            dia = entity.dia
        }
        return@transaction schedule?.toSchedule() ?: throw Exception("No se encontró el horario con id $id")
    }
    override fun delete(id: Int) = transaction {
        val schedule = ScheduleDAO.findById(id)
        schedule?.delete()
        return@transaction
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

    //devolver horarios haciendo join con materias
    /*
    *     fun obtenerDatosMaterias(): List<Any> = transaction {
        val resultado = (Subjects innerJoin MateriaUsuario)
            .selectAll()
            .map {
                mapOf(
                    "id" to it[Subjects.id].value,
                    "nombreMateria" to it[Subjects.nombre],
                    "idUsuario" to it[MateriaUsuario.idUsuario],
                    "idMateria" to it[MateriaUsuario.idMateria],
                    "materiaAcro" to it[MateriaUsuario.materiaAcro],
                    "materiaColor" to it[MateriaUsuario.materiaColor],
                    "profesorNombre" to it[MateriaUsuario.profesorNombre]
                )
            }
        return@transaction resultado
    }

    * */
    fun obtenerHorarios(): List<Any> = transaction {
        val resultado = (Horarios innerJoin Subjects )
            .selectAll()
            .map {
                mapOf(
                    "id" to it[Horarios.id].value,
                    "idMateria" to it[Horarios.idMateria],
                    "idUser" to it[Horarios.idUser],
                    "hora_inicio" to it[Horarios.hora_inicio],
                    "hora_fin" to it[Horarios.hora_fin],
                    "dia" to it[Horarios.dia],
                    "nombre" to it[Subjects.nombre],
                    "materiaAcro" to it[Subjects.materiaAcro],
                    "materiaColor" to it[Subjects.materiaColor],
                    "profesorNombre" to it[Subjects.profesorNombre]
                )
            }
        return@transaction resultado
    }



}