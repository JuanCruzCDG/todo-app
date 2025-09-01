import Task from '../model/task.js';
import connection from '../config/db.js';

const TaskRepository = {
    getTaskById: async function(id) {
        try {
            var task = new Task();
            const query = `SELECT * FROM tareas WHERE id = ${id}`;

            await connection.query(query).then((error, results) => {
                if (error) {
                    console.error("Ocurrió un error obteniendo los datos de la tarea: ", error);
                    return error;
                }

                task.id          = results["id"];
                task.createdAt   = results["created_at"];
                task.updatedAt   = results["updated_at"];
                task.deletedAt   = results["deleted_at"];
                task.completedAt = results["deleted_at"];
                task.deleted     = results["deleted"];
                task.title       = results["title"];
                task.description = results["description"];
                task.details     = results["details"];
                task.deadline    = results["deadline"];
                task.completed   = results["completed"];
                task.link        = results["link"];
                task.previous    = results["previous_id"];
                task.next        = results["next_id"];
            });

            const related = `
                SELECT * FROM relaciones r
                LEFT JOIN tareas t ON t.id = r.id
                WHERE r.id = ${id}
            `;

            await connection.query(related).then((error, results) =>{
                if (error) {
                    console.error("Ocurrió un error obteniendo los datos de la tarea: ", error);
                    return error;
                }

                task.related = results;
            });

            return task;
        } catch (error) { return error; }
    },
    getAllTasks: async function() {
        try {
            var tasks = [];
            const query = "SELECT id FROM tareas";

            await connection.query(query).then((error, results) => {
                if (error) {
                    console.error("Ocurrió un error obteniendo los datos de la base: ", error);
                    return error;
                }
                
                results.forEach(id => {
                    tasks.push(this.getTaskById(id))
                });                
            });

            return tasks;
        } catch (error) { return error; }
    },
    createTask: async function(task) {
        try {
            const query = `
                INSERT INTO tareas (
                    title,
                    description,
                    details,
                    deadline,
                    link,
                    previous,
                    next
                )
                VALUES (
                    ${task.title},
                    ${task.description},
                    ${task.details},
                    ${task.deadline},
                    ${task.link},
                    ${task.previous},
                    ${task.next}
                )
            `;

            await connection.query(query).then((error, results) => {
                if (error) {
                    console.error("Falló al intentar crear la tarea: ", error);
                    return error;
                }

                return results;
            });
        } catch (error) { return error; }
    },
    updateTask: async function(task) {
        try {
            const query = `
                UPDATE tareas
                SET 
                    title = ${task.title},
                    description = ${task.description},
                    details = ${task.details},
                    deadline = ${task.deadline},
                    link = ${task.link},
                    previous = ${task.previous},
                    next = ${task.next},
                    updaed_at == CURRENT_TIMESTAMP
                WHERE id = ${task.id}
            `;

            await connection.query(query).then((error, results) => {
                if (error) {
                    console.error("Ocurrió un error intentando actualizar la tarea: ", error);
                    return error;
                }

                return results;
            });
        } catch (error) { return error; }
    },
    deleteTask: async function(id) {
        try {
            const query = `DELETE FROM tareas WHERE id = ${id}`;

            await connection.query(query).then((error, results) => {
                if (error) {
                    console.error("Ocurrió un error al eliminar la tarea: ", error);
                    return error;
                }

                return results;
            });
        } catch (error) { return error; }
    }
};

export default TaskRepository;