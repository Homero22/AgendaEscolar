package com.example.logica

import com.example.data.models.Homework
import com.example.data.models.Note
import com.example.data.models.promptModel
import com.example.services.GptProject.model.GptInterceptor
import kotlinx.coroutines.future.await


class ChatLogic {

    fun getById(id: Int, data:Any): String {
       return when (data){
           is Note ->{
                    val ideas = data.apunteIdeas
                    val resumen = data.apunteResumen
                    val notas = data.apunteNotasClase
                    val titulo = data.apunteTitulo
                 val promt = "Necesito ayuda para generar material de estudio con información adicional para mi apunte de $titulo. Mis ideas son: $ideas, mi resumen es: $resumen y mis notas de clase son: $notas"
               return promt

           }
           is Homework ->{
               val titulo = data.tareaTitulo
               val descripcion = data.tareaDescripcion
              val promt = "Necesito ayuda información sobre temas relacionados para estudiar en base a mi tarea de $titulo. La descripción es: $descripcion"
               return promt
           }
           else ->{
               return "No se encontró el tipo de dato"
           }
       }
    }
     suspend fun postChat(prompt: promptModel):Any{
        val gpt = GptInterceptor()
        return  gpt.postGpt(prompt.mensaje).await().choices[0].message.content
    }

}