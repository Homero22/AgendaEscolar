import { sequelize } from "../../database/database.js";
import { Inscripcion } from "../../models/evento/inscripcion.models.js";

const getInscripciones = async (req, res) => {
    
        try {
            const inscripciones = await Inscripcion.findAll();
            res.json({
                status: true,
                message: 'Inscripciones obtenidas correctamente',
                body: inscripciones
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener las inscripciones',
                data: {}
            });
        }
    }

export default {
    getInscripciones
};
