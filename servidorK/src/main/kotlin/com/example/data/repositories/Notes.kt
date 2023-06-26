package com.example.data.repositories
import com.example.data.entities.Notes
import com.example.data.entities.NotesDAO
import com.example.data.models.Note
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction

object Notes : CrudRepository<Note, Int>() {
    override fun getAll(limit: Int, offset: Int): List<Note> = transaction{
        val response = NotesDAO.all().limit(limit, offset.toLong())
        return@transaction response.map {it.toNotes()}
    }

    override fun getById(id: Int) = transaction {
        return@transaction NotesDAO.findById(id.toLong())?.toNotes()
    }
    override fun save(entity: Note) = transaction {
        val response = NotesDAO.new{
            idUser = entity.idUser
            idMateria = entity.idMateria
            apunteTitulo = entity.apunteTitulo
            apunteNotasClase = entity.apunteNotasClase
            apunteIdeas = entity.apunteIdeas
            apunteResumen = entity.apunteResumen
            apunteRecordatorio = java.time.LocalTime.parse(entity.apunteRecordatorio)
            fechaCreacion = java.time.LocalDateTime.now()
        }
        return@transaction response.toNotes()
    }
    override fun update(id:Int, entity: Note): Note = transaction{
        val response = NotesDAO.findById(id.toLong())?.apply {
            apunteTitulo = entity.apunteTitulo
            apunteNotasClase = entity.apunteNotasClase
            apunteIdeas = entity.apunteIdeas
            apunteResumen = entity.apunteResumen
            apunteRecordatorio = java.time.LocalTime.parse(entity.apunteRecordatorio)
        }?.toNotes()
        return@transaction response!!
    }

    override fun delete(id: Int): Any = transaction {
        val note = NotesDAO.findById(id.toLong())?:return@transaction
        note.delete()
        return@transaction
    }

    //funcion para obtener todas las notas de un usuario
    fun getAllByUser(id:Long): List<Any> = transaction{
        val res = Notes
            .select ({ Notes.idUser eq id })
            .map {
                mapOf(
                    "id" to it[Notes.id].value,
                    "idUser" to it[Notes.idUser],
                    "idMateria" to it[Notes.idMateria],
                        //Colocamos el nombre de la materia
                    "apunteTitulo" to it[Notes.apunteTitulo],
                    "apunteNotasClase" to it[Notes.apunteNotasClase],
                    "apunteIdeas" to it[Notes.apunteIdeas],
                    "apunteResumen" to it[Notes.apunteResumen],
                    "apunteRecordatorio" to it[Notes.apunteRecordatorio],
                    "fechaCreacion" to it[Notes.fechaCreacion]
                )
            }
        return@transaction res
    }

    /*
        fun getAllByUser(id: Long):List<Any> = transaction {
        val res = Homeworks
            .select({ Homeworks.idUser eq id })
            .map {
                mapOf(
                    "id" to it[Homeworks.id].value,
                    "idUser" to it[Homeworks.idUser],
                    "idMateria" to it[Homeworks.idMateria],
                    "tareaTitulo" to it[Homeworks.tareaTitulo],
                    "tareaDescripcion" to it[Homeworks.tareaDescripcion],
                    "fechaCreacion" to it[Homeworks.fechaCreacion],
                    "fechaFin" to it[Homeworks.fechaFin],
                    "tareaEstado" to it[Homeworks.tareaEstado],
                    "tareaRecordatorio" to it[Homeworks.tareaRecordatorio]
                )
            }
        return@transaction res
    }
     */

}