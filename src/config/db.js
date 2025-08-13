import 'dotenv/config';
import mysql from 'mysql2/promise';

const connection = mysql.createConnection({
    host : process.env.DB_HOST || 'localhost',
    user : process.env.DB_USER || 'root',
    password : process.env.DB_PASSWORD || '',
    schema : process.env.DB_NAME || 'app_tareas'
});

/**
 * Obtiene una instancia del pool de conexiones.
 * Si no existe, la crea con las credenciales del archivo .env.
 * @returns {mysql.Pool} El pool de conexiones de MySQL.
 */
const initDatabase = function() {
    connection.connect((error) => {
        if (error) {
            console.error("No se pudo conectar a la base de datos: ", error);
            return;
        }

        let taskTableQuery = `
            CREATE TABLE IF NOT EXISTS tareas(
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(128),
                description VARCHAR(255),
                details TEXT,
                deadline DATETIME,
                completed BOOL,
                link VARCHAR(255),
                related INT,
                previous INT,
                next INT,
                FOREING KEY (previous) REFERENCE tareas(id),
                FOREING KEY (next) REFERENCE tareas(id)
            )
        `;

        let realationsTableQuery = `
            CREATE TABLE IF NOT EXISTS relaciones(
                id INT AUTO_INCREMENT PRIMARY KEY,
                task_id INT,
                related_task_id INT,
                FOREING KEY (task_id) REFERENCE tareas(id),
                FOREING KEY (related_task_id) REFERENCE tareas(id)
            )
        `;

        let metaTableQuery = `
            CREATE TABLE IF NOT EXISTS metadata(
                id INT,
                created_at DATETIME,
                updated_at DATETIME,
                deleted_at DATETIME,
                deleted DATETIME,
                FOREING KEY (id) REFERENCE tareas(id) 
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

        connection.query(metaTableQuery, (error, results) => {
            if (error) {
                console.error("Hubo un error al crear la tabla 'metadata': ", error);
                return;
            }
            console.log("Conexión exitosa: ", results);
        });
    });
}

export default { connection, initDatabase };