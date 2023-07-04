package com.example.data.entities


import com.example.data.models.Image
import org.jetbrains.exposed.dao.LongEntity
import org.jetbrains.exposed.dao.LongEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.LongIdTable


object Images: LongIdTable("tb_images") {
    val imagenes = varchar("str_images_imagenes",255)
    val estado = varchar("str_images_estado",255).default("ACTIVO")
}


class ImagesDAO (id: EntityID<Long>) : LongEntity(id){
    companion object : LongEntityClass<ImagesDAO>(Images)
    var imagenes by Images.imagenes
    var estado by Images.estado

    fun toImages(): Image {
        return Image(
            id.value,
            imagenes,
            estado
        )
    }


}
