import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

export const Conferencia = sequelize.define(
    "tb_conferencia",
    {
        int_conferencia_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        int_conferencia_id: {
            type: DataTypes.INTEGER,
            
        },
        dt_conferencia_fecha: {
            type: DataTypes.DATE,

        },
        time_conferencia_hora_ini: {
            type: DataTypes.TIME,

        },
        time_conferencia_hora_fin : {
            type: DataTypes.TIME,


        },
        str_conferencia_area  : {
            type: DataTypes.STRING(100),

        },
        str_conferencia_titulo  : {
            type: DataTypes.STRING(100),

        },
        int_conferencia_cupo_max  : {
            type: DataTypes.INTEGER,

        },
        fl_conferencia_costo  : {
            type: DataTypes.FLOAT,

        },
        /*Table conferencia {
  id_conferencia serial [primary key]
  int_dia integer
  dt_fecha date
  dt_hora_ini time
  dt_hora_fin time 
  str_area varchar
  str_titulo varchar
  id_expositor integer
  fl_costo float
}*/
    },
        {
            schema: 'eventos',
            timestamps: true, //desactivar la creación automática de dos columnas adicionales "createdAt" y "updatedAt".
        }
);
