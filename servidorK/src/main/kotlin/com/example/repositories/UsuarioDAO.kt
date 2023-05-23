package com.example.repositories
import com.example.database.Usuarios
import com.example.models.Usuario
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction

object UsuarioDAO {
    fun crearUsuario(usuario: Usuario): Usuario {
        return transaction {
            Usuarios.insert { row ->
                row[str_usuario_nombre] = usuario.nombre
            }
            usuario
        }
    }
}