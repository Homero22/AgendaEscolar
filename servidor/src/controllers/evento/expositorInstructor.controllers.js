import { sequelize } from "../../database/database.js";
import { ExpositorInstructor } from "../../models/evento/expositorInstructor.models.js";

const getExpositoresInstructores = async (req, res) => {

    try {
        const expositoresInstructores = await ExpositorInstructor.findAll();
        res.json({
            status: true,
            message: 'ExpositoresInstructores obtenidos correctamente',
            body: expositoresInstructores
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los expositoresInstructores',
            data: {}
        });
    }
}

export default {
    getExpositoresInstructores
};

