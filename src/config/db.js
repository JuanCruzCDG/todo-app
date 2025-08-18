import 'dotenv/config';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host : process.env.DB_HOST || 'localhost',
    user : process.env.DB_USER || 'root',
    password : process.env.DB_PASSWORD || '',
    database : process.env.DB_NAME || 'app_tareas'
});

const initDatabase = async function() {    
    let taskTableQuery = `
        CREATE TABLE IF NOT EXISTS tareas(
            id           INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at   DATETIME              DEFAULT CURRENT_TIMESTAMP,
            completed_at DATETIME              DEFAULT NULL,
            deleted_at   DATETIME              DEFAULT NULL,
            deleted      BOOL         NOT NULL DEFAULT FALSE,
            title        VARCHAR(128),
            description  VARCHAR(255),
            details      TEXT,
            deadline     DATETIME              DEFAULT NULL,
            completed    BOOL         NOT NULL DEFAULT FALSE,
            link         VARCHAR(255) NOT NULL,
            previous     INT                   DEFAULT NULL,
            next         INT                   DEFAULT NULL,
            FOREIGN KEY (previous) REFERENCES tareas(id),
            FOREIGN KEY (next) REFERENCES tareas(id)
        )
    `;

    let relationsTableQuery = `
        CREATE TABLE IF NOT EXISTS relaciones(
            id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            task_id         INT NOT NULL,
            related_task_id INT NOT NULL,
            FOREIGN KEY (task_id) REFERENCES tareas(id),
            FOREIGN KEY (related_task_id) REFERENCES tareas(id)
        )
    `;

    await connection.query(taskTableQuery).then((error, results) => {
        if (error) {
            console.error("Hubo un error al crear la tabla 'tareas': ", error);
            return;
        }
        console.log("Conexión exitosa: ", results);
    });

    await connection.query(relationsTableQuery).then((error, results) => {
        if (error) {
            console.error("Hubo un error al crear la tabla 'relaciones': ", error);
            return;
        }
        console.log("Conexión exitosa: ", results);
    });
}

export default { connection, initDatabase };