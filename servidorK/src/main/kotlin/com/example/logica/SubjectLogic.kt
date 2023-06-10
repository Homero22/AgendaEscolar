package com.example.logica

import com.example.data.models.SubjectUser

class SubjectLogic {
    //funcion para crear una materia desde un usuario
    fun createSubject(objeto: SubjectUser ): Int {
        val idmateria = objeto.idMateria
        //comprobamos si la materia existe
        if (idmateria == 1) {
            return 0
        }
        return 1
    }
    //funcion que obtenga los nombres de la materia de un usuario
    fun getSubjectsNames(idUser: Int): List<String> {
        return listOf("Matematicas", "Fisica", "Programacion")
    }
}