package com.example.logica

import com.example.data.models.Note
import com.example.data.repositories.Notes
import com.example.data.repositories.cGenerica

class NotesLogic {
    val obj = cGenerica<Notes>()
    fun getAll(limit: Int, offset: Int): List<Any> {
        return obj.gGetAll(Notes, limit, offset)
    }

    fun save(apunte: Note): Any {
        return obj.gSave(Notes, apunte)
    }

    fun getById(id: Int): Any {
        return obj.gGgetById(Notes, id) as Note
    }

    fun update(id: Int, note: Note): Any {
        return obj.gUpdate(Notes, id, note)
    }

    fun delete(id: Int): Any {
        return obj.gDelete(Notes, id)
    }

    fun getByUser(id: Int): List<Any> {
        return obj.gGetByUserId(Notes, id)
    }
}