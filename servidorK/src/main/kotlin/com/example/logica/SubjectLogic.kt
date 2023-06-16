package com.example.logica

import com.example.data.models.Subject
import com.example.data.models.SubjectUser
import com.example.data.repositories.Subjects
import com.example.data.repositories.cGenerica

class SubjectLogic {
    val obj = cGenerica<Subjects>()

    //funcion para crear una materia desde un usuario
    fun createSubject(objeto: Subject): Int {
        val respuesta = obj.gSearch(Subjects, objeto.nombre)
        //comprobamos si la materia existe
        if (respuesta == null) {
            //si no existe la materia la creamos
            Subjects.save(objeto)
            return 1
        }
        return 0
    }

    //funcion que obtenga todas las materias de un usuario
    fun getAll(): List<Any> {
        return obj.gGetAll(Subjects);

    }


    fun getOne(id: Int): Subject? {
        return obj.gGgetById(Subjects, id) as? Subject
    }


    fun actualizar(id: Int, subjectu: SubjectUser): Any {
        return obj.gUpdate(Subjects,id,subjectu) as SubjectUser
    }

    fun eliminar(id: Int): Int {
        val respuesta = obj.gGgetById(Subjects,id)
        if (respuesta != null) {
            obj.gDelete(Subjects,id)
            return 1
        }
        return 0
    }

    fun getById(id:Int ): Any?  {
        return obj.gGgetById(Subjects,id);
    }
}