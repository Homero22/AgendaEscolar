package com.example.logica

import com.example.data.models.Homework
import com.example.data.repositories.Homeworks
import com.example.data.repositories.cGenerica

class HomeworksLogic {
    val obj = cGenerica<Homeworks>()

    fun createHomework(objeto: Any): Any {
        return obj.gSave(Homeworks,objeto)
    }

    fun getAll(limit: Int, offset: Int): List<Any> {
        return obj.gGetAll(Homeworks,limit,offset)
    }

    fun updateHomework(id: Int, homework: Any): Any {
        return obj.gUpdate(Homeworks,id,homework)
    }

    fun deleteHomework(id: Int): Any {
        val respuesta = obj.gGgetById(Homeworks,id)
        if (respuesta != null) {
            obj.gDelete(Homeworks,id)
            return 1
        }
        return 0
    }


    fun getById(id: Int): Any {
        return obj.gGgetById(Homeworks,id) ?: return 0
    }


    fun getByUserId(id: Int): Any? {
        return obj.gGetByUserId(Homeworks,id)
    }

    fun save(homework: Homework): Any {
        return obj.gSave(Homeworks,homework)
    }

    fun update(id: Int, homework: Homework): Any {
        return obj.gUpdate(Homeworks,id,homework)
    }

    fun delete(id: Int): Any {
        val respuesta = obj.gGgetById(Homeworks,id)

        if (respuesta != null) {
            obj.gDelete(Homeworks,id)
            return 1
        }
        return 0
    }

    fun getByEstado(id: Int, estado: Int): Any {
        when (estado) {
            0 -> return obj.gGetByEstado(Homeworks, id, "FINALIZADO")
            1 -> return obj.gGetByEstado(Homeworks, id, "PENDIENTE")
        }
        return 0
    }



}