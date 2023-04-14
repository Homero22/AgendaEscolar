import * as dotenv from 'dotenv';
dotenv.config();

export const dbVariables={
    dbUser: process.env.DB_USER,
    dbServer: process.env.DB_SERVER,
    dbPassword: process.env.DB_PASSWORD,
    dbDialect: process.env.DB_DIALECT,
    dbName:process.env.DB_NAME
}

export const configVariables={
    port: process.env.SERVER_PORT
}
