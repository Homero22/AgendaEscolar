package com.example.logica

import com.example.data.models.Schedule
import com.example.data.repositories.Schedules
import com.example.data.repositories.cGenerica
import java.lang.Boolean.TRUE

class ScheduleLogic {
    val obj = cGenerica<Schedules>()

    fun crearHorario(objeto: Schedule): Int {

        val respuesta = obj.gSearch(Schedules, objeto.idMateria, objeto.hora_inicio, objeto.hora_fin, objeto.dia)
        //comprobamos si la materia existe
        if (respuesta == TRUE) {
            //si no existe la materia la creamos
            Schedules.save(objeto)
            return 1
        }
        return 0

    }

    fun getAll():List<Any> {
        return obj.gGetAll(Schedules)
    }

    fun actualizarHorario(id: Int, schedule: Any): Any {

        return obj.gUpdate(Schedules,id,schedule)
    }

    fun eliminarHorario(id: Int): Any {
        val respuesta = obj.gGgetById(Schedules,id)
        if (respuesta != null) {
            obj.gDelete(Schedules,id)
            return 1
        }
        return 0
    }

    fun getById(id: Int): Any {
        return obj.gGgetById(Schedules,id) ?: return 0
    }

}


