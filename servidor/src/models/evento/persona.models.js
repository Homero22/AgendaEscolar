import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

export const Persona = sequelize.define(
    "tb_persona",

    {
        int_persona_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        str_persona_cedula: {
            type: DataTypes.STRING(10),
        },
        str_persona_nombre: {
            type: DataTypes.STRING(100),
        },
        str_persona_apellido: {
            type: DataTypes.STRING(100),
        },
        str_persona_correo: {
            type: DataTypes.STRING(100),
        },
        str_persona_genero: {
            type: DataTypes.STRING(1),
        },
        int_persona_edad: {
            type: DataTypes.INTEGER,
        },
        str_persona_tipo: {
            type: DataTypes.STRING(30),
        },
        str_persona_unidad_educativa: {
            type: DataTypes.STRING(100),
        },
        str_persona_institucion: {
            type: DataTypes.STRING(255),
        },
    },
    {
        schema: "eventos",
        timestamps: true, //desactivar la creación automática de dos columnas adicionales "createdAt" y "updatedAt".
    }
);


/*
Table persona {
  id_persona serial pk
  str_cedula varchar(10)
  str_nombre varchar
  str_apellido varchar
  correo varchar
  genero char(1)
  edad smallint
  tipo varchar(30)
  unidad_educativa varchar
  institucion varchar
}

 */