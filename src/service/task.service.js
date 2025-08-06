import TaskRepository from "../repository/task.repository.js";

function invalid(element) {
    return element == '' ||
           element == 0 ||
           element == null ||
           element == undefined;
}

function validateTask(task) {
    return task.forEach((currentField) => {
        if (invalid(currentField)) throw new ReferenceError(`The ${currentField} field is invalid.`); 
    });
}

const TaskService = {
    getTaskById: async function(id) {
        try {
            if (invalid(id)) throw new ReferenceError("Id is not valid.");
            if (typeof id != "number") throw new TypeError("Id must be an integer.");
            
            const task = await TaskRepository.getTaskById(id);
            validateTask(task);

            return task;
        } catch (error) {
            return error;
        }
    },
    getAllTasks: async function() {
        try {
            const tasks = await TaskRepository.getAllTasks();

            if (invalid(tasks)) throw new ReferenceError("An error occured in the database when trying to retrieve the tasks.");

            return tasks;
        } catch (error) {
            return error;
        }
    },
    createTask: async function(Task) {
        try {
            validateTask(Task);
            return await TaskRepository.createTask(Task);
        } catch (error) {
            return error;
        }
    },
    updateTask: async function(Task) {
        try {
            validateTask(Task);
            return await TaskRepository.updateTask(Task);
        } catch (error) {
            return error;
        }
    },
    deleteTask: async function(id) {
        try {
            if (invalid(id)) throw new ReferenceError("Id is not valid.");
            if (typeof id != "number") throw new TypeError("Id must be an integer.");

            return await TaskRepository.deleteTask(id);
        } catch (error) {
            return error;
        }
    }
};

export default TaskService;