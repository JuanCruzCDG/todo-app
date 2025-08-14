import Task from '../model/task.js';
import connection from '../config/db.js';

const TaskRepository = {
    getTaskById: async function(id) {
        try {
            var task = new Task();

            var query = `SELECT * FROM tareas WHERE id = ${id}`;

            connection.query(query, (error, results) => {
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

            var related = `
                SELECT * FROM relaciones r
                LEFT JOIN tareas t ON t.id = r.id
                WHERE r.id = ${id}
            `;

            connection.query(related, (error, results) =>{
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
            var query = "SELECT id FROM tareas";

            connection.query(query, (error, results) => {
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
        // acá ya viene todo validado, no deberían haber tipos erroneos para los campos.
        try {
            var query = `
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

            connection.query(query, (error, results) => {
                if (error) {
                    console.error("Falló al intentar crear la tarea: ", error);
                    return error;
                }

                return results;
            });
        } catch (error) { return error; }
    },
    updateTask: async function(task) {
        // actualizar los datos de la tarea
        try {
            var query = `
                UPDATE tareas
                SET
                    
            `;
        } catch (error) { return error; }
    },
    deleteTask: async function(id) {
        // borrar la tarea con ese id
        try {
            
        } catch (error) { return error; }
    }
};

export default TaskRepository;