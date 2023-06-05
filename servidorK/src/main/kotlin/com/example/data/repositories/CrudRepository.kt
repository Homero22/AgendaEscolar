package com.example.data.repositories

import java.time.LocalTime

interface  CrudRepository <T,ID>{
    fun getAll(limit:Int,offset:Int): List<T>?
    fun getById(id: ID): T?
    fun save(entity: T): T
    fun update(id:ID, entity: T):T?
    fun delete(id: ID): Unit?
}