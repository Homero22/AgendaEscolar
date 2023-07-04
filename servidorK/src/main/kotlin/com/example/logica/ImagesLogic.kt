package com.example.logica

import com.example.data.models.Image
import com.example.data.repositories.Homeworks
import com.example.data.repositories.ImagesRepo
import com.example.data.repositories.cGenerica


class ImagesLogic {

    val obj = cGenerica<ImagesRepo>()
    fun save(fileName: Image): Int {
        //verifico que la imagen no exista
        val respuesta = obj.gGetByUserName(ImagesRepo,fileName.path)
        if (respuesta != null) {
            return 0
        }else{
            val g = obj.gSave(ImagesRepo,fileName)
            return 1
        }
    }


}