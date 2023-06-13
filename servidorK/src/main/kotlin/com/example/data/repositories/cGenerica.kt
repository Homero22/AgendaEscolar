package com.example.data.repositories

import com.example.data.entities.MateriaUsuario
import com.example.data.models.*
import java.lang.IllegalArgumentException

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
            is SubjectsUsers ->{
                obj.getAll(limit,offset)
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
                    obj.search(valor)
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
    fun gSearch(obj: T, valor: Int): Any? {
        return when(obj) {
            is SubjectsUsers -> {
                SubjectsUsers.existSubject(valor)
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
            is SubjectsUsers ->{
                obj.getById(id)
            }
            else -> throw IllegalArgumentException("Tipo de objeto no compatible")
        }
    }

    fun gUpdate(obj: T, id: Int, entity: Any): Any {
        return when(obj) {
            is SubjectsUsers -> {
                obj.update(id, entity as SubjectUser)
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
            is SubjectsUsers ->{
                obj.delete(id)
            }
            else -> throw IllegalArgumentException("Tipo de objeto no compatible")
        }
       }



}