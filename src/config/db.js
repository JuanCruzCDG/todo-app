import 'dotenv/config';
import mysql from 'mysql2/promise';

const connection = mysql.createConnection({
    host : process.env.DB_HOST || 'localhost',
    user : process.env.DB_USER || 'root',
    password : process.env.DB_PASSWORD || '',
    schema : process.env.DB_NAME || 'app_tareas'
});

const initDatabase = function() {
    connection.connect((error) => {
        if (error) {
            console.error("No se pudo conectar a la base de datos: ", error);
            return;
        }

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
                FOREING KEY (previous) REFERENCE tareas(id),
                FOREING KEY (next) REFERENCE tareas(id)
            )
        `;

        let realationsTableQuery = `
            CREATE TABLE IF NOT EXISTS relaciones(
                id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                task_id         INT NOT NULL,
                related_task_id INT NOT NULL,
                FOREING KEY (task_id) REFERENCE tareas(id),
                FOREING KEY (related_task_id) REFERENCE tareas(id)
            )
        `;

        connection.query(taskTableQuery, (error, results) => {
            if (error) {
                console.error("Hubo un error al crear la tabla 'tareas': ", error);
                return;
            }
            console.log("Conexión exitosa: ", results);
        });

        connection.query(realationsTableQuery, (error, results) => {
            if (error) {
                console.error("Hubo un error al crear la tabla 'relaciones': ", error);
                return;
            }
            console.log("Conexión exitosa: ", results);
        });
    });
}

export default { connection, initDatabase };