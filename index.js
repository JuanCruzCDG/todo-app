import 'dotenv/config';
import path from 'path';
import express from'express';
import db from './src/config/db.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const app = express();

const init = function() {
    app.use(express.json());
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: true }));
    app.listen(process.env.PORT, () => {
        console.info(`La aplicación Node está corriendo en el puerto http://localhost:${process.env.PORT}`);
    });

    // db.initDatabase();

    app.get('/', (request, response) => {
        response.sendFile(path.join(__dirname, 'src/templates/index.html'));
    });
}

init();

