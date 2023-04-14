import { sequelize } from "../../database/database.js";
import { Evaluacion } from "../../models/evento/evaluacion.models.js";


const getEvaluaciones = async (req, res) => {

    try {
        const evaluaciones = await Evaluacion.findAll();
        res.json({
            status: true,
            message: 'Evaluaciones obtenidas correctamente',
            body: evaluaciones
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener las evaluaciones',
            data: {}
        });
    }
}

export default {
    getEvaluaciones
};
