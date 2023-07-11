package com.example.logica

import com.example.data.models.User
import com.example.data.models.reportes.usuariosPorMes
import com.example.data.models.reportes.usuariosPorNombreMes
import com.example.data.repositories.Users
import com.example.data.repositories.cGenerica

class UserLogic {

    //Declaramos un objeto de tipo generico
    private val obj = cGenerica<Users>()

    //Metodo para verificar si el correo ya existe en la base de datos
    private fun verificarCorreo(correo: String): Boolean {
        val user = Users.searchEmail(correo)
        return user != null
    }

    //Metodo para verificar si el telefono ya existe en la base de dato
    private fun verificarTelefono(telefono: String): Boolean {
        val user = Users.searchPhone(telefono)
        return user != null
    }
    // Funcion para Ingresar un nuevo usuario validando que el correo y el telefono no existan en la base de datos
    fun insertarUsuario(user: User): Boolean {
        val verificarCorreo = verificarCorreo(user.correo)
        val verificarTelefono = verificarTelefono(user.telefono)
        if (!verificarCorreo && !verificarTelefono) {
            obj.gSave(Users,user)
            return true
        }
        return false
    }

    fun getAll(limit:Int, offset:Int): List<Any> {
        return obj.gGetAll(Users,limit,offset)

    }

    fun getById(id: Int): Any? {
        return obj.gGgetById(Users,id)
    }
    //funcion para guaradar un usuario
    fun save(entity: User): User {
        return obj.gSave(Users,entity) as User
    }

    fun getTotal(cantidad:Int): Long {
        return obj.gGetTotal(Users,cantidad)
    }



    fun getAllAnios(): List<Any> {
        return obj.gGetAllAnios(Users)
    }

    fun getByAnio(anio: Int):List<usuariosPorNombreMes> {
        var res = obj.gGetByAnio(Users,anio)
        if(res.isEmpty()){
            return emptyList()
        }
        //recorremos res para convertir el numero del mes a nombre del mes y agregar a un nuevo array de tipo usuariosPorNombreMes
        var res2 = mutableListOf<usuariosPorNombreMes>()
        for (i in res){
            var mes = convertirMes(i.mes)
            var obj = usuariosPorNombreMes(mes,i.cantidad)
            res2.add(obj)
        }
        return res2

    }
    private fun convertirMes(numeroMes: Int): String {
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

    fun getAdmins(limit: Int, offset: Int): List<Any> {
        return obj.gGetAdmins(Users,limit,offset)

    }

    fun delete(id: Int): Any {
        val respuesta = obj.gGgetById(Users,id) as? User
        return if (respuesta != null) {
            if(respuesta.estado=="ACTIVO"){
                obj.gEliminadoLogico(Users,id,"INACTIVO")
                1
            }else{
                obj.gEliminadoLogico(Users,id,"ACTIVO")
                2
            }
        }else{
            0
        }

    }

    fun getBySearch(search: String): List<Any> {
        return obj.gGetBySearch(Users,search)
    }


}