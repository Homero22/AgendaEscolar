package com.example.data.entities

import com.example.data.models.Country
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

object Countries : IntIdTable("seguridad.tb_pais") {
    val nombre = varchar("str_pais_nombre", 255).uniqueIndex()
    val acronimo = varchar("str_pais_acronimo", 255).uniqueIndex()
    var estado = varchar("str_pais_estado", 255)
}
//clase que mapea la tabla de paises
class CountryDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<CountryDAO>(Countries)
    var nombre by Countries.nombre
    var acronimo by Countries.acronimo
    var estado by Countries.estado

    fun toCountry():Country{
        return Country(
            id.value,
            nombre,
            acronimo,
            estado

        )
    }

}