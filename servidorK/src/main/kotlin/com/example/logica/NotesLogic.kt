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
        val apuntes = obj.gSearch(Notes, apunte.apunteTitulo)
        if(apuntes == true){
            return 0
        }else{
            return obj.gSave(Notes, apunte)
        }
    }

    fun getById(id: Int): Any? {
        return obj.gGgetById(Notes, id)
    }

    fun update(id: Int, note: Note): Any {
        val apuntes = obj.gGgetById(Notes, id) as Note?
        if (apuntes != null) {
            if(apuntes != note
                ){
                obj.gUpdate(Notes, id, note)
                return 1
            }else{
                return 0
            }
        }else{
            return -1
        }
    }

    fun delete(id: Int): Any {
        val apuntes = obj.gGgetById(Notes, id)
        if (apuntes != null) {
            obj.gDelete(Notes, id)
            return 1
        }else{
            return 0
        }

    }

    fun getByUser(id: Int): List<Any> {
        return obj.gGetByUserId(Notes, id)
    }
}