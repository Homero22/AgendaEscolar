package com.example.data.repositories

import com.example.data.models.Country
import com.example.data.models.Note
import com.example.data.models.Subject
import com.example.data.models.User
import java.lang.IllegalArgumentException

class cGenerica <T > {


   fun insertar(obj:T){

      when(obj){
         is Users ->{
             println("LLega a insertar")
         }
       }

   }

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

    fun save (obj: T, entity: Any): Any {
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



}