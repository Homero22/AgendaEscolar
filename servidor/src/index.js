import app from "./app.js";
import https from "https";
import fs from "fs";
import { configVariables } from "../src/config/variables.config.js";

import { sequelize } from "./database/database.js";
async function main(port) {
    try {
        await sequelize.sync({ force: false });
        sequelize.authenticate().then(() => {
            console.log("Connection has been established successfully.");
        }).catch((error) => {
            console.error("Unable to connect to the database:", error);
        });
        
        app.listen(port);
        console.log(`Servidor corriendo en el puerto ${port}`);
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

main(configVariables.port);
