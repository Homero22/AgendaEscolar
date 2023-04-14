import { sequelize } from "../../database/database.js";
import { Conferencia } from "../../models/evento/conferencia.models.js";


const getConferencias = async (req, res) => {

    try {
        const conferencias = await Conferencia.findAll();
        res.json({
            status: true,
            message: 'Conferencias obtenidas correctamente',
            body: conferencias
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener las conferencias',
            data: {}
        });
    }
}

export default {
    getConferencias
};