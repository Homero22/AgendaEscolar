import { sequelize } from "../../database/database.js";
import { Persona } from "../../models/evento/persona.models.js";

const getPersonas = async (req, res) => {
    
        try {
            const personas = await Persona.findAll();
            res.json({
                status: true,
                message: 'Personas obtenidas correctamente',
                body: personas
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener las personas',
                data: {}
            });
        }
    }

export default {
    getPersonas
};
