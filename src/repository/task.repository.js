import Task from '../model/task.js';

const TaskRepository = {
    getTaskById: async function(id) {
        // buscar la tarea por el id
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