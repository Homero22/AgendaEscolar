import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

export const Talleres = sequelize.define(
    "tb_talleres",
    {
        int_taller_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        dt_taller_fecha: {
            type: DataTypes.DATE,
        },
        time_taller_hora_ini: {
            type: DataTypes.TIME,
        },
        time_taller_hora_fin: {
            type: DataTypes.TIME,
        },
        str_taller_titulo: {
            type: DataTypes.STRING(255),
        },
        str_taller_area: {
            type: DataTypes.STRING(255),
        },
        int_taller_cupo_max: {
            type: DataTypes.INTEGER,
        },
        str_taller_aula: {
            type: DataTypes.STRING(255),
        },
        int_taller_id_instructor: {
            type: DataTypes.INTEGER,
        },
        fl_taller_costo_docente: {
            type: DataTypes.FLOAT,
        },
        fl_taller_costo_estudiante: {
            type: DataTypes.FLOAT,
        },
        fl_taller_costo_publico: {
            type: DataTypes.FLOAT,
        },
    },
    {
        schema: "eventos",
        timestamps: true, //desactivar la creación automática de dos columnas adicionales "createdAt" y "updatedAt".
    }
);



/*
Table taller {
  id_taller serial [primary key]
  dt_fecha date
  dt_hora_ini time
  dt_hora_fin time
  str_titulo varchar
  str_area varchar
  int_cupo_max int
  str_aula varchar
  id_instructor int
  fl_costo_docente float
  fl_costo_estudiante float
  fl_costo_publico float
}
*/ 