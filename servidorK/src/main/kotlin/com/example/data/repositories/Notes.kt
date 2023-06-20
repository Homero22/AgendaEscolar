package com.example.data.repositories
import com.example.data.entities.NotesDAO
import com.example.data.models.Note
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
            apunteTitulo = entity.apunteTitulo
            apunteTexto = entity.apunteTexto
            apunteRecordatorio = java.time.LocalTime.parse(entity.apunteRecordatorio)
            fechaCreacion = java.time.LocalDateTime.now()
        }
        return@transaction response.toNotes()
    }
    override fun update(id:Int, entity: Note): Note = transaction{
        val response = NotesDAO.findById(id.toLong())?.apply {
            apunteTitulo = entity.apunteTitulo
            apunteTexto = entity.apunteTexto
            apunteRecordatorio = java.time.LocalTime.parse(entity.apunteRecordatorio)
        }?.toNotes()
        return@transaction response!!
    }

    override fun delete(id: Int): Any = transaction {
        val note = NotesDAO.findById(id.toLong())?:return@transaction
        note.delete()
        return@transaction
    }

}