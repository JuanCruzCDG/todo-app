import TaskRepository from "../repository/task.repository.js";
import validator from "../middleware/validator.js";

const TaskService = {
    getTaskById: async function(id) {
        try {
            if (validator.invalid(id)) throw new ReferenceError("Id no es válido.");
            if (typeof id != "number") throw new TypeError("Id debe ser un número.");
            
            const task = await TaskRepository.getTaskById(id);
            validator.validateTask(task);

            return task;
        } catch (error) { return error; }
    },
    getAllTasks: async function() {
        try {
            const tasks = await TaskRepository.getAllTasks();

            if (validator.invalid(tasks)) throw new ReferenceError("Ocurrión un error en la base de datos.");

            return tasks;
        } catch (error) { return error; }
    },
    createTask: async function(task) {
        try {
            validator.validateTask(task);
            validator.validateFiledTypes(task);
            return await TaskRepository.createTask(task);
        } catch (error) { return error; }
    },
    updateTask: async function(task) {
        try {
            const task = await this.getTaskById(task.id);

            validator.validateTask(task);
            validator.validateFiledTypes(task);

            return await TaskRepository.updateTask(task);
        } catch (error) { return error; }
    },
    deleteTask: async function(id) {
        try {
            if (validator.invalid(id)) throw new ReferenceError("Id no es válido.");
            if (typeof id != "number") throw new TypeError("Id debe ser un número.");

            return await TaskRepository.deleteTask(id);
        } catch (error) { return error; }
    }
};

export default TaskService;