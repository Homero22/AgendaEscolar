package com.example.logica

import com.example.data.models.User
import com.example.data.models.reportes.usuariosPorMes
import com.example.data.models.reportes.usuariosPorNombreMes
import com.example.data.repositories.Users
import com.example.data.repositories.cGenerica

class UserLogic {

    //Declaramos un objeto de tipo generico
    val obj = cGenerica<Users>()

    //Metodo para verificar si el correo ya existe en la base de datos
    fun verificarCorreo(correo: String): Boolean {
        val user = Users.searchEmail(correo)
        if (user == null) {
            return false
        }
        return true
    }

    //Metodo para verificar si el telefono ya existe en la base de dato
    fun verificarTelefono(telefono: String): Boolean {
        val user = Users.searchPhone(telefono)
        if (user == null) {
            return false
        }
        return true
    }


    //Metodo para devolver el usuario que tiene el correo ingresado o telefono ingresado
    /*fun searchUser(correo: String, telefono: String): User {
        val user = Users.getUser(correo, telefono)
        return user!!
    }*/

    // Funcion para Ingresar un nuevo usuario validando que el correo y el telefono no existan en la base de datos
    fun insertarUsuario(user: User): Boolean {
        val verificarCorreo = verificarCorreo(user.correo)
        val verificarTelefono = verificarTelefono(user.telefono)
        if (!verificarCorreo && !verificarTelefono) {
            Users.save(user)
            return true
        }
        return false
    }

    fun getAll(limit:Int, offset:Int): List<User> {
        return obj.gGetAll(Users,limit,offset) as List<User>

    }

    fun getById(id: Int): User? {
        return obj.gGgetById(Users,id) as User?
    }
    //funcion para guaradar un usuario
    fun save(entity: User): User {
        return obj.gSave(Users,entity) as User
    }

    fun getTotal(id:Int): Any {
        return obj.gGetTotal(Users,id)
    }



    fun getAllAnios(): List<Any> {
        return obj.gGetAllAnios(Users)
    }

    fun getByAnio(anio: Int):List<usuariosPorNombreMes> {
        var res = obj.gGetByAnio(Users,anio)
        //recorremos res para convertir el numero del mes a nombre del mes y agregar a un nuevo array de tipo usuariosPorNombreMes
        var res2 = mutableListOf<usuariosPorNombreMes>()
        for (i in res){
            var mes = convertirMes(i.mes)
            var obj = usuariosPorNombreMes(mes,i.cantidad)
            res2.add(obj)
        }
        return res2



    }
    fun convertirMes(numeroMes: Int): String {
        return when (numeroMes) {
            1 -> "Enero"
            2 -> "Febrero"
            3 -> "Marzo"
            4 -> "Abril"
            5 -> "Mayo"
            6 -> "Junio"
            7 -> "Julio"
            8 -> "Agosto"
            9 -> "Septiembre"
            10 -> "Octubre"
            11 -> "Noviembre"
            12 -> "Diciembre"
            else -> "Mes inválido"
        }
    }

    fun updateUser(id: Int, user: User): Int {
        val respuesta = obj.gGgetById(Users,id)

        return if(respuesta == null){
            0
        }else{
            obj.gUpdate(Users,id,user)
            1
        }
    }



}