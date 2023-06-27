package com.example.logica

import com.example.data.repositories.Users
import com.example.data.repositories.cGenerica

class ReportesLogic {
    val obj = cGenerica<Users>()
    fun reporteUsuarios():List<Any> {
        val reporte = obj.gReportes(Users)
        if(reporte != null){
            return reporte
        }else{
            return emptyList()
        }

    }
}