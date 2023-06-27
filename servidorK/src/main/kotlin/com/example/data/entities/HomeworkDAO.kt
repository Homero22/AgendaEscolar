package com.example.data.entities


import com.example.data.models.Homework
import org.jetbrains.exposed.dao.LongEntity
import org.jetbrains.exposed.dao.LongEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.LongIdTable
import org.jetbrains.exposed.sql.javatime.datetime
import org.jetbrains.exposed.sql.javatime.time

object Homeworks : LongIdTable("tb_tarea"){
    val idUser = long("int_usuario_id").references(Users.id)
    val idMateria = integer("int_materia_id").references(Subjects.id)
    val tareaTitulo = text("str_tarea_titulo")
    val tareaDescripcion= text("str_tarea_descripcion")
    val fechaCreacion = datetime("dt_fecha_creacion")
    val fechaFin = datetime("dt_fecha_fin")
    val tareaEstado = varchar("str_tarea_estado",15)
    val tareaRecordatorio = time("time_recordatorio")
}

//Clase que mapea la tabla tareas

class HomeworkDAO (id: EntityID<Long>) : LongEntity(id){
    companion object : LongEntityClass<HomeworkDAO>(Homeworks)
    var idUser by Homeworks.idUser
    var idMateria by Homeworks.idMateria
    var tareaTitulo by Homeworks.tareaTitulo
    var tareaDescripcion by Homeworks.tareaDescripcion
    var fechaCreacion by Homeworks.fechaCreacion
    var fechaFin by Homeworks.fechaFin
    var tareaEstado by Homeworks.tareaEstado
    var tareaRecordatorio by Homeworks.tareaRecordatorio

    fun toHomework(): Homework {
        return Homework(
            id.value.toInt(),
            idUser,
            idMateria,
            tareaTitulo,
            tareaDescripcion,
            fechaCreacion.toString(),
            fechaFin.toString(),
            tareaEstado,
            tareaRecordatorio.toString()
        )
    }

}