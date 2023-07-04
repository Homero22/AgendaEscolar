package com.example.routes

import com.example.utils.ResponseEmpty
import com.example.utils.sendJsonResponse
import io.github.cdimascio.dotenv.dotenv

import io.ktor.http.*
import io.ktor.http.content.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.io.File
import java.nio.file.FileSystem
import java.nio.file.FileSystems
import java.nio.file.Paths

fun Route.imagenesRouting(){
    route("/uploads") {
       post {
           val multipart = call.receiveMultipart()
           var fileName: String? = null
           println("Llega al post de imagenes")

           val folder = File("uploadsImages").canonicalPath
           println( "folder: $folder")


           multipart.forEachPart { part ->
               when(part){
                   is PartData.FileItem->{
                       val file = part.originalFileName?.let { fileName ->
                           File(folder,fileName)

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
           val response = ResponseEmpty(true,"Archivo subido correctamente", emptyList())
           sendJsonResponse(call, HttpStatusCode.OK, response)
       }

    }
}