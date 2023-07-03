package com.example.routes

import io.ktor.http.content.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.io.File

fun Route.imagenesRouting(){
    route("/uploads") {
       post {
           val multipart = call.receiveMultipart()
           var fileName: String? = null
           println("Llega al post de imagenes")

           multipart.forEachPart { part ->
               when(part){
                   is PartData.FileItem->{
                       val file = part.originalFileName?.let { fileName ->
                           File("uploads",fileName)

                       }
                       part.streamProvider().use{
                           input -> file?.outputStream()?.buffered()?.use { output ->
                           input.copyTo(output)
                            }


                       }
                       fileName = file?.name

                   }
                   else -> {
                       println("Multipart no es un archivo")
                   }

               }
               part.dispose()
           }
              call.respondText("Archivo subido correctamente: $fileName")
       }

    }
}