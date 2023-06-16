package com.example.logica

import com.example.data.models.Schedule
import com.example.data.repositories.Schedules
import com.example.data.repositories.cGenerica

class ScheduleLogic {
    val obj = cGenerica<Schedules>()

    fun crearHorario(objeto: Schedule): Int {

        val respuesta = obj.gSearch(Schedules, objeto.idMateria, objeto.hora_inicio, objeto.hora_fin, objeto.dia)
        //comprobamos si la materia existe
        if (respuesta == null) {
            //si no existe la materia la creamos
            Schedules.save(objeto)
            return 1
        }
        return 0

    }

    fun getAll():List<Any> {
        return obj.gGetAll(Schedules)
    }

}


