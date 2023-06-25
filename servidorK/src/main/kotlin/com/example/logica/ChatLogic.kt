package com.example.logica

import com.example.data.entities.Homeworks
import com.example.data.entities.Notes
import com.example.data.models.promptModel
import com.example.services.chatgpt

class ChatLogic {
    lateinit var promt :String;
    fun getById(id: Int, data:Any): Any {
       return when (data){
           is Notes ->{
                    val ideas = data.apunteIdeas
                    val resumen = data.apunteResumen
                    val notas = data.apunteNotasClase
                    val titulo = data.apunteTitulo
                promt = "Necesito ayuda con información adicional para mi apunte de $titulo. Mis ideas son: $ideas, mi resumen es: $resumen y mis notas de clase son: $notas"
               return promt


           }
           is Homeworks ->{
               val titulo = data.tareaTitulo
               val descripcion = data.tareaDescripcion
               promt = "Necesito ayuda información sobre temas relacionados para estudiar en base a mi tarea de $titulo. La descripción es: $descripcion"
               return promt
           }
           else ->{
               return "No se encontró el tipo de dato"
           }
       }

    }

  suspend  fun post(prompt: promptModel): Any {
        val res = chatgpt().dataChat(prompt.mensaje)
      return res
    }

}