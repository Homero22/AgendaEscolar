import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

export const ExpositorInstructor = sequelize.define(
    "tb_expositor_instructor",
    {
        int_expositor_instructor_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        str_expositor_instructor_nombre: {
            type: DataTypes.STRING(100),
        },
        str_expositor_instructor_curriculum: {
            type: DataTypes.BLOB,
        },
    },
    {
        schema: "eventos",
        timestamps: true, //desactivar la creación automática de dos columnas adicionales "createdAt" y "updatedAt".
    }
);

/*Table instruc_expo {
  id_instruc_expo serial [primary key]
  str_nombre varchar
  str_curriculum bytea
}
 */