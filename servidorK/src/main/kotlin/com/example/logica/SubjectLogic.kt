package com.example.logica

import com.example.data.models.Subject
import com.example.data.models.SubjectUser
import com.example.data.repositories.Subjects
import com.example.data.repositories.SubjectsUsers
import com.example.data.repositories.Users
import com.example.data.repositories.cGenerica
import com.sun.mail.imap.protocol.ID
import org.jetbrains.exposed.sql.Op
import java.lang.Boolean.TRUE

class SubjectLogic {
    val obj = cGenerica<SubjectsUsers>()

    //funcion para crear una materia desde un usuario
    fun createSubject(objeto: SubjectUser ): Int {
        val respuesta = obj.gSearch(SubjectsUsers, objeto.idMateria)
        //comprobamos si la materia existe
        if (respuesta == null) {
            //si no existe la materia la creamos
            SubjectsUsers.save(objeto)
            return 1
        }
        return 0
    }

    //funcion que obtenga todas las materias de un usuario
    fun getAll(limit:Int, offset:Int): List<SubjectUser> {
        return obj.gGetAll(SubjectsUsers,limit,offset) as List<SubjectUser>
    }

    fun getOne(id: Int): SubjectUser? {
        // debemos obtener el nombre de 
        return obj.gGgetById(SubjectsUsers, id) as? SubjectUser

    }


    fun actualizar(id: Int, subjectu: SubjectUser): Any {
        return obj.gUpdate(SubjectsUsers,id,subjectu) as SubjectUser
    }

    fun eliminar(id: Int): Int {
        val respuesta = obj.gGgetById(SubjectsUsers,id)
        if (respuesta != null) {
            obj.gDelete(SubjectsUsers,id)
            return 1
        }
        return 0
    }
}