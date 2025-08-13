import express from'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import initDatabase from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const init = function() {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.listen(process.env.PORT, () => {
        console.log(`La aplicación Node está corriendo en el puerto http://localhost:${env.process.PORT}`);
    });

    initDatabase();
}

init();
