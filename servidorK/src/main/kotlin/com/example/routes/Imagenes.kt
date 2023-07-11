package com.example.routes

import com.example.data.models.Image
import com.example.data.repositories.ImagesRepo
import com.example.logica.ImagesLogic
import com.example.utils.ResponseEmpty
import com.example.utils.ResponseImage
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

           var id: String? = null
           var nombreImage: String? = null
           val resourcePath = object {}.javaClass.classLoader.getResource("uploads/images")?.path
           val folder1 = resourcePath?.let { File(it).absolutePath }

           val folderPath = object {}.javaClass.protectionDomain.codeSource.location.path
           val folder = File(folderPath).parent+File.separator+"uploads"+File.separator

           println( "folder en la ruta ad: $folder")


           multipart.forEachPart { part ->
               when(part){
                   is PartData.FileItem->{
                       nombreImage = part.originalFileName
                       val uniqueID = java.util.UUID.randomUUID().toString()
                       val fileExtension = part.originalFileName?.split(".")?.last()
                       val fileName = "$uniqueID.$fileExtension"
                       id= fileName
                       val file = folder?.let { File(it, fileName)

                       }
                       part.streamProvider().use{
                           input -> file?.outputStream()?.buffered()?.use { output ->
                           input.copyTo(output)
                            }


                       }

                   }
                   else -> {
                       println("Multipart no es un archivo")
                   }


               }
               part.dispose()
           }

           //funcion para enviar a la capa logica

           fun guardarBD(fileName: String,nombre:String): Any {
               println("Llega a guardarBD")
               println("fileName: $fileName")
               //barra invertida
               return ImagesLogic().save(Image(0,fileName,"ACTIVO", "$folder$nombre"))
               //return ImagesRepo.save(Image(0,fileName,"ACTIVO"))
           }
          val valid=  guardarBD(id.toString(),nombreImage.toString())

           if(valid==1) {
                val response = ResponseEmpty(true, "Archivo subido correctamente", emptyList())
                sendJsonResponse(call, HttpStatusCode.OK, response)
           }else{
                val response = ResponseEmpty(false, "Ya existe una imagen con el mismo nombre", emptyList())
                sendJsonResponse(call, HttpStatusCode.OK, response)
           }
       }

        get("/{id}"){
            val id = call.parameters["id"]?.toIntOrNull() ?: 0
            //Envio a la capa logica
            val image = ImagesLogic().getImage(id)
            if(image!=null){

                //envío al cliente la imagen en formato binario
                //obtengo el path de la carpeta uploads

                val folderPath = object {}.javaClass.protectionDomain.codeSource.location.path
                val folder = File(folderPath).parent+File.separator+"uploads"+File.separator

                //extraigo el nombre de la imagen
                val imagePath = image.imagenes
                val imageName = imagePath.substringAfterLast(File.separator)

                println("Nombre de la imagen SIN LA RUTA: $imageName")



                //EXTRAIGO LA IMAGEN EN FORMATO BINARIO
                val imagenBinario = File("$folder$imageName").readBytes()


                val response = ResponseImage(true,"Imagen encontrada", imagenBinario)
                sendJsonResponse(call, HttpStatusCode.OK, response)
            }else{
                val response = ResponseEmpty(false,"No se encontro imagen", emptyList())
                sendJsonResponse(call, HttpStatusCode.OK, response)
            }

        }


    }
}