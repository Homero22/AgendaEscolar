package com.example.data.repositories


import com.example.data.models.*
import com.example.data.models.reportes.usuariosPorMes



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
            is Homeworks ->{
                obj.getAll(limit,offset)
            }
            is Schedules ->{
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
            is Homeworks ->{
                obj.save(entity as Homework)
            }
            is ImagesRepo ->{
                obj.save(entity as Image)
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
            is Subjects -> {
                obj.search(valor)
            }
            is LoginRequest ->{
                Users.searchEmail(valor) as User
            }
            is Notes ->{
                obj.searchTitle(valor)
            }
            is Homeworks ->{
                obj.searchTitle(valor)
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
                obj.getById(id) //
            }
            is Notes ->{
                obj.getById(id)
            }
            is Schedules ->{
                obj. getById(id)
            }
            is Homeworks ->{
                obj.getById(id)
            }
            is ImagesRepo ->{
                obj.getById(id) as Image
            }
            else -> throw IllegalArgumentException("Tipo de objeto no compatible")
        }
    }

    fun gReportes(obj:T):List<Any>{
        return when(obj){
            is Users->{
                obj.usuariosPais()
            }
            else -> throw IllegalArgumentException("Tipo de objeto no compatible")
        }
    }



    fun gUpdate(obj: T, id: Int, entity: Any): Any {
        return when(obj) {
            is Subjects -> {
                obj.update(id, entity as Subject)
            }
            is Homeworks -> {
                obj.update(id, entity as Homework)
            }
            is Schedules -> {
                obj.update(id, entity as Schedule)
            }
            is Notes ->{
                obj.update(id, entity as Note)
            }
            is Users ->{
                obj.update(id, entity as User)
            }
            else -> throw IllegalArgumentException("Tipo de objeto no compatible")
        }
    }
    fun gEliminadoLogico (obj: T, id: Int,valor:String): Any{
        return when (obj){
            is Users ->{
                obj.eliminadoLogico(id,valor)
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
           is Homeworks ->{
               obj.delete(id)
           }
           is Schedules ->{
               obj.delete(id)
           }
            else -> throw IllegalArgumentException("Tipo de objeto no compatible")
        }
       }

    fun gGetByUserId(obj: T, id: Int): List<Any> {
        return when(obj) {
            is Subjects -> {
                obj.getByIdUser(id.toLong())
            }
            is Homeworks -> {
                obj.getAllByUser(id.toLong())
            }
            is Notes ->{
                obj.getAllByUser(id.toLong())
            }
            is Schedules ->{
                obj.getAllByUser(id.toLong())
            }
            else -> throw IllegalArgumentException("Tipo de objeto no compatible")
        }
    }

    fun gGetByEstado(homeworks: T, id: Int, estado: String): List<Any> {
        return when(homeworks) {
            is Homeworks -> {
                homeworks.getAllByUserAndState(id.toLong(),estado)
            }
            else -> throw IllegalArgumentException("Tipo de objeto no compatible")
        }
    }

    fun gGetTotal(users: T, id: Int): Long {
        return when(users) {
            is Users -> {
                users.getTotal(id)
            }
            is Subjects -> {
                users.getTotal()
            }
            else -> throw IllegalArgumentException("Tipo de objeto no compatible")
        }
    }

    fun gGetAllAnios(users: T): List<Any> {
        return when(users) {
            is Users -> {
                users.getAllAnios()
            }
            else -> throw IllegalArgumentException("Tipo de objeto no compatible")
        }
    }

    fun gGetByAnio(users: T, anio: Int): List<usuariosPorMes>{
        return when(users) {
            is Users -> {
                users.getUsuariosPorMes(anio)
            }
            else -> throw IllegalArgumentException("Tipo de objeto no compatible")
        }
    }

    fun gGetAdmins(users: T, limit: Int, offset: Int): List<Any> {
        return when(users) {
            is Users -> {
                users.getAdministradores(limit,offset)
            }
            else -> throw IllegalArgumentException("Tipo de objeto no compatible")
        }
    }

    fun gGetByUserName(imagesRepo: T, imagenes: String): Image?{
        return when(imagesRepo) {
            is ImagesRepo -> {
                imagesRepo.getByName(imagenes)
            }
            else -> throw IllegalArgumentException("Tipo de objeto no compatible")
        }
    }





}