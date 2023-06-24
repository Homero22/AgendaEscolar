package com.example.data.entities

import com.example.data.models.Note
import org.jetbrains.exposed.dao.LongEntity
import org.jetbrains.exposed.dao.LongEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.LongIdTable
import org.jetbrains.exposed.sql.javatime.datetime
import org.jetbrains.exposed.sql.javatime.time

object Notes : LongIdTable("tb_apuntes"){
    var idUser = long("int_usuario_id").references(Users.id)
    var idMateria= integer("int_materia_id").references(Subjects.id)
    var apunteTitulo = varchar("str_apunte_titulo", 255)
    var apunteTexto = text("str_apunte_texto")
    var apunteRecordatorio = time("time_recordatorio")
    var fechaCreacion = datetime("dt_fecha_creacion")
}

//Class que mapea la tabla de Apuntes

class NotesDAO(id: EntityID<Long>) : LongEntity(id){
    companion object : LongEntityClass<NotesDAO>(Notes)
    var idUser by Notes.idUser
    var idMateria by Notes.idMateria
    var apunteTitulo by Notes.apunteTitulo
    var apunteTexto by Notes.apunteTexto
    var apunteRecordatorio by Notes.apunteRecordatorio
    var fechaCreacion by Notes.fechaCreacion

    fun toNotes() : Note{
        return Note(
            id.value.toInt(),
            idUser,
            idMateria,
            apunteTitulo,
            apunteTexto,
            apunteRecordatorio.toString(),
            fechaCreacion.toString()
        )
    }
}