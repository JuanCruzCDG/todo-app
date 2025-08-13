import Task from '../model/task.js';
import connection from '../config/db.js';

const TaskRepository = {
    table: "tareas",
    getTaskById: async function(id) {
        try {
            var task = new Task();

            var query = `
                SELECT * FROM ${this.table} t
                INNER JOIN metadata m ON t.id = m.id
                WHERE t.id = ${id}
            `;

            connection.query(query, (error, results) => {
                if (error) {
                    console.error("Ocurrió un error obteniendo los datos de la tarea: ", error);
                    return;
                }

                task.meta.id        = results["id"];
                task.meta.createdAt = results["created_at"];
                task.meta.updatedAt = results["updated_at"];
                task.meta.deletedAt = results["deleted_at"];
                task.meta.deleted   = results["deleted"];
                task.title          = results["title"];
                task.description    = results["description"];
                task.details        = results["details"];
                task.deadline       = results["deadline"];
                task.completed      = results["completed"];
                task.link           = results["link"];
                task.previous       = results["previous_id"];
                task.next           = results["next_id"];
            });

            var related = `
                SELECT * FROM relaciones r
                LEFT JOIN ${this.table} t ON t.id = r.id
                WHERE r.id = ${id}
            `;

            connection.query(related, (error, results) =>{
                if (error) {
                    console.error("Ocurrió un error obteniendo los datos de la tarea: ", error);
                    return;
                }

                task.related = results;
            });

            return task;
        } catch (error) { return error; }
    },
    getAllTasks: async function() {
        // devolver todas las tareas que no están eliminadas
    },
    createTask: async function(Task) {
        // guardar la nueva tarea recibida
    },
    updateTask: async function(Task) {
        // actualizar los datos de la tarea
    },
    deleteTask: async function(id) {
        // borrar la tarea con ese id
    }
};

export default TaskRepository;