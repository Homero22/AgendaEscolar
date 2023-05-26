package com.example.data.repositories

import com.example.data.entities.CountryDAO
import com.example.data.models.Country
import org.jetbrains.exposed.sql.transactions.transaction

object Countries : CrudRepository<Country, Int> {

    override fun getAll(limit: Int) = transaction {
        val response = CountryDAO.all().limit(limit)
        return@transaction response.map { it.toCountry() }
    }

    override fun getById(id: Int) = transaction {
        CountryDAO.findById(id)?.toCountry()
    }

    override fun save(entity: Country)= transaction {
        entity.id = CountryDAO.new {
            nombre = entity.nombre
            acronimo = entity.acronimo
        }.id.value
        return@transaction entity
    }

    override fun update(id: Int, entity: Country)= transaction {
        val country = CountryDAO.findById(id)?:return@transaction false
        country.apply{
            nombre = entity.nombre
            acronimo = entity.acronimo
        }
        entity.id=id
        return@transaction true
    }

    override fun delete(id: Int)= transaction {
        val country = CountryDAO.findById(id)?:return@transaction false
        country.apply {
            estado = "INACTIVO"
        }
        return@transaction true
    }
    fun isEmpty()= transaction {
        return@transaction CountryDAO.all().empty()
    }

}