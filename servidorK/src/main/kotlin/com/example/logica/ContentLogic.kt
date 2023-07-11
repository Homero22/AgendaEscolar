package com.example.logica

import com.example.data.models.ContentModel
import com.example.data.repositories.Contents

import com.example.data.repositories.cGenerica

class ContentLogic {
    val obj = cGenerica<Contents>()
    fun getById(id: Int): Any {
        return obj.gGgetById(Contents, id) ?: 0

    }


    fun save(content: ContentModel): Int {
        val res = obj.gGetByIdApunte(Contents,content.idApunte)
        return if (res ==-1){
            obj.gSave(Contents,content)
            1
        }else{
            0
        }
    }

    fun getSimilar(id: Int): List<Any> {

        val contents = obj.gGetContent(Contents,id) as ContentModel?

        println("ayaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")


        return if(contents == null){
            emptyList()
        }else{
            println(contents.id)
            println(contents.categoria)
            val res = obj.gGetSimilar(Contents, contents.categoria)
            res
        }

    }

    fun update(id: Int, content: ContentModel): Any {
        val res = obj.gGgetById2(Contents,id)
        return if (res == null){
            0
        }else{
            obj.gUpdate(Contents,id,content)
            1
        }
    }

    fun delete(id: Int): Any {
        val res2 = obj.gGgetById2(Contents,id)
        return if (res2 == null){
            0
        }else{
            obj.gDelete(Contents,id)
            1
        }
    }


}