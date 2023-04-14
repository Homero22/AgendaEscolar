import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

export const Evaluacion = sequelize.define(
    "tb_evaluacion",
    {
        int_evaluacion_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        int_evaluacion_nota: {
            type: DataTypes.INTEGER,
        },
        str_evaluacion_comentario: {
            type: DataTypes.STRING(255),
        },
        int_evaluacion_id_persona: {
            type: DataTypes.INTEGER,
        },
        int_evaluacion_id_instruc_expo: {
            type: DataTypes.INTEGER,
        },
    },
    {
        schema: "eventos",
        timestamps: true, //desactivar la creación automática de dos columnas adicionales "createdAt" y "updatedAt".
    }
);



/*  Table evaluacion {
  id_evaluacion seria pk
  nota int
  comentario varchar
  id_persona int
  id_instruc_expo int
}
*/