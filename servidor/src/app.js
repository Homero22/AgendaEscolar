import express from 'express';
import cors from 'cors';
import indexRoutes from './routes/index.routes.js';
const app = express();
app.use(express.json());
const whiteList = [
    "http://localhost:4200",
  ];
app.use(cors(
    {
        credentials: true,
        origin: whiteList,
    }
));
export default app;
app.use(indexRoutes);