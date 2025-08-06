import express from'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const init = function() {
    app.use(express.json());
    app.listen(env.process.PORT, () => {
        console.log(`La aplicación Node está corriendo en el puerto http://localhost:${env.process.PORT}`);
    });
}

init();
