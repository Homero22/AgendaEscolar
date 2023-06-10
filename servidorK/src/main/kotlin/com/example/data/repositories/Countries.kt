package com.example.data.repositories

import com.example.data.entities.Countries
import com.example.data.entities.CountryDAO
import com.example.data.models.Country
import com.example.data.models.User
import org.jetbrains.exposed.sql.transactions.transaction

object Countries : CrudRepository<Country, Int>() {

    override fun getAll(limit: Int, offset:Int ) = transaction {
        val response = CountryDAO.all().limit(limit, offset.toLong())
        return@transaction response.map { it.toCountry() }
    }

    override fun getById(id: Int) = transaction {
        CountryDAO.findById(id)?.toCountry()
    }

    override fun save(entity: Country)= transaction {
        entity.id = CountryDAO.new {
            nombre = entity.nombre
            acronimo = entity.acronimo
            estado = entity.estado
        }.id.value
        return@transaction entity
    }

    override fun update(id: Int, entity: Country): Country= transaction {
        val response = CountryDAO.findById(id)?.apply {
            nombre = entity.nombre
            acronimo = entity.acronimo
            estado = entity.estado
        }?.toCountry()
        return@transaction response!!
    }

    override fun delete(id: Int)= transaction {
        val country = CountryDAO.findById(id)?:return@transaction
        country.apply {
            estado = "INACTIVO"
        }
        return@transaction
    }
    fun isEmpty()= transaction {
        return@transaction CountryDAO.all().empty()
    }

    fun search(name: String): Country? = transaction {
        return@transaction CountryDAO.find { Countries.nombre eq  name }.singleOrNull()?.toCountry()
    }


}