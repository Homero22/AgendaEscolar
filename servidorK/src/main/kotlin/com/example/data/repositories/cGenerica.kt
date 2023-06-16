package com.example.data.repositories

import com.example.data.models.Country
import com.example.data.models.Note
import com.example.data.models.Subject
import com.example.data.models.User

class cGenerica <T> {

    fun <T> gGetAll(obj: T, limit: Int, offset: Int): List<Any> {
        return when(obj) {
            is Users -> {
                obj.getAll(limit, offset);
            }
            is Countries -> {
                obj.getAll(limit, offset)
            }
            is Subjects -> {
                obj.getAll(limit, offset)
            }
            is Notes ->{
                obj.getAll(limit,offset)
            }
            else -> throw IllegalArgumentException("Tipo de objeto no compatible")
        }
    }

    fun <T> gGetAll(obj: T): List<Any> {
        return when(obj) {
            is Schedules-> {
                obj.obtenerHorarios();
            }
            is Subjects -> {
                obj.getAll();
            }

            else -> throw IllegalArgumentException("Tipo de objeto no compatible")
        }
    }

    fun gSave (obj: T, entity: Any): Any {
        return when(obj) {
            is Users -> {
                obj.save(entity as User)
            }
            is Countries -> {
                obj.save(entity as Country)
            }
            is Subjects -> {
                obj.save(entity as Subject)
            }
            is Notes ->{
                obj.save(entity as Note)
            }
            else -> throw IllegalArgumentException("Tipo de objeto no compatible")
        }
    }

    // Buscar un valor en especifico  y devovler un objeto
    fun gSearch(obj: T, valor: String): Any? {
        return when(obj) {
            is Users -> {
                if(valor.contains("@")) {
                    obj.searchEmail(valor)
                }else{
                    obj.searchPhone(valor)
                }
            }
            is Countries -> {
                obj.search(valor)
            }
            else -> throw IllegalArgumentException("Tipo de objeto no compatible")
        }
    }


    fun gSearch(obj: T, valor: Int, valor2:String,valor3:String,valor4:String): Boolean {
        return when(obj) {
            is Schedules -> {
                obj.checkSchedule(valor,valor2,valor3,valor4)
            }
            else -> throw IllegalArgumentException("Tipo de objeto no compatible")
        }
    }


    // Obtener un objeto por su id

    fun gGgetById(obj: T, id: Int): Any? {
        return when(obj) {
            is Users -> {
                obj.getById(id)
            }
            is Countries -> {
                obj.getById(id)
            }
            is Subjects -> {
                obj.getById(id)
            }
            is Notes ->{
                obj.getById(id)
            }
            is Schedules ->{
                obj. getAllByUser(id.toLong())
            }
            else -> throw IllegalArgumentException("Tipo de objeto no compatible")
        }
    }



    fun gUpdate(obj: T, id: Int, entity: Any): Any {
        return when(obj) {
            is Subjects -> {
                obj.update(id, entity as Subject)
            }
            else -> throw IllegalArgumentException("Tipo de objeto no compatible")
        }
    }

    fun gDelete(obj: T, id: Int): Any {
       return when(obj) {
            is Users -> {
                obj.delete(id)
            }
            is Countries -> {
                obj.delete(id)
            }
            is Subjects -> {
                obj.delete(id)
            }
            is Notes ->{
                obj.delete(id)
            }
            else -> throw IllegalArgumentException("Tipo de objeto no compatible")
        }
       }

    fun gGetByUserId(subjects: T, id: Int): Any? {
        return when(subjects) {
            is Subjects -> {
                subjects.getByIdUser(id.toLong())
            }
            else -> throw IllegalArgumentException("Tipo de objeto no compatible")
        }
    }

    //buscamos nombre de materia
    /*
    fun gGetDataSubjects(obj: T): List<Any> {
        return when(obj) {
            is Subjects -> {
                obj.obtenerDatosMaterias();
            }
            else -> throw IllegalArgumentException("Tipo de objeto no compatible")
        }
    }

     */



}