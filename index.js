import 'dotenv/config';
import path from 'path';
import express from'express';
import initDatabase from './src/config/db.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const app = express();

const init = function() {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.listen(process.env.PORT, () => {
        console.info(`La aplicación Node está corriendo en el puerto http://localhost:${env.process.PORT}`);
    });

    initDatabase();

    app.get('/', (request, response) => {
        response.sendFile(path.join(__dirname, 'templates/index.html'));
    });
}

init();
