package com.example.data.repositories

import java.time.LocalTime

abstract class  CrudRepository <T,ID>{
    abstract fun getAll(limit:Int, offset:Int): List<T>?
    abstract fun getById(id: ID): T?
    abstract fun save(entity: T): T
    abstract fun update(id:ID, entity: T):T?
    abstract fun delete(id: ID): Unit?
}