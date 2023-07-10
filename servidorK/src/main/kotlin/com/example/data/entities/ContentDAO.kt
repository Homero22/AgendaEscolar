package com.example.data.entities

import com.example.data.models.ContentModel
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

object Contents : IntIdTable("tb_contenido"){
    val idApunte = long("int_apunte_id").references(Notes.id)
    val contenido = text("str_contenido_apunte")
    val estado = varchar("str_contenido_estado", 255).default("PÚBLICO")
    val puntuacion = integer("int_contenido_puntuacion").default(0)
    val idUser = long("int_usuario_id").references(Users.id)
    val categoria = varchar("str_contenido_categoria", 255).default("Sin categoría")

}
class ContentDAO(id: EntityID<Int>) : IntEntity(id){
    companion object : IntEntityClass<ContentDAO>(Contents)
    var idApunte by Contents.idApunte
    var contenido by Contents.contenido
    var estado by Contents.estado
    var puntuacion by Contents.puntuacion
    var idUser by Contents.idUser
    var categoria by Contents.categoria

    fun toContent(): ContentModel {
        return ContentModel(
            id.value,
            idApunte,
            contenido,
            estado,
            puntuacion,
            idUser,
            categoria
        )
    }
}
