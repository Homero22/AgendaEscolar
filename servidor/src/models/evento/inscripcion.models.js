import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

export const Inscripcion = sequelize.define(
    "tb_inscripcion",
    {
        int_inscripcion_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fl_inscripcion_pago: {
            type: DataTypes.FLOAT,
        },
        int_inscripcion_id_evento: {
            type: DataTypes.INTEGER,
        },
        int_inscripcion_id_persona: {
            type: DataTypes.INTEGER,
        },
    },
    {
        schema: "eventos",
        timestamps: true, //desactivar la creación automática de dos columnas adicionales "createdAt" y "updatedAt".
    }
);


/*Table inscripcion{
  id_inscripcion serial pk
  fl_pago float
  id_evento integer
  id_persona integer
}
 */