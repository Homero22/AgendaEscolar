package com.example.data.entities


import com.example.data.models.Image
import org.jetbrains.exposed.dao.LongEntity
import org.jetbrains.exposed.dao.LongEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.LongIdTable


object Images: LongIdTable("tb_images") {

    val imagenes = text("str_images_imagenes")
    val estado = varchar("str_images_estado",255).default("ACTIVO")
    val path = text("str_images_path")
}


class ImagesDAO (id: EntityID<Long>) : LongEntity(id){
    companion object : LongEntityClass<ImagesDAO>(Images)
    var imagenes by Images.imagenes
    var estado by Images.estado
    var path by Images.path

    fun toImages(): Image {
        return Image(
            id.value.toInt(),
            imagenes,
            estado,
            path
        )
    }


}
