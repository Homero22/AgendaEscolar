import { Router } from "express";
import conferenciaRoute from "../routes/eventos/conferencias.routes.js";
import inscripcionRoute from "../routes/eventos/inscripcion.routes.js";
import personaRoute from "../routes/eventos/persona.routes.js";
import evaluacionRoute from "../routes/eventos/evaluacion.routes.js";
import expositorInstructorRoiute from "../routes/eventos/expositorInstructor.routes.js";
import talleresRoute from "../routes/eventos/talleres.routes.js";

const router = Router();

export default router;