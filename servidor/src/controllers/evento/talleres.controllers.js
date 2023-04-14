import { sequelize } from "../../database/database.js";
import { Talleres } from "../../models/evento/talleres.models.js";

const getTalleres = async (req, res) => {
            
        try {
            const talleres = await Talleres.findAll();
            res.json({
                status: true,
                message: 'Talleres obtenidos correctamente',
                body: talleres
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener los talleres',
                data: {}
            });
        }
    }

export default {
    getTalleres
};

