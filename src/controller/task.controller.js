import TaskService from "../service/task.service.js";

const TaskController = {
    getTaskById: async function(request, response) {
        try {
            const task = await TaskService.getTaskById(request.params.id);
            response.json({ status: 200, data: task });
        } catch (error) {
            response.json({ status: error.code, message: error.message });
        }
    },
    getAllTasks: async function(request, response) {
        try {
            const tasks = await TaskService.getAllTasks();
            response.json({ status: 200, data: tasks });
        } catch (error) {
            response.json({ status: error.code, message: error.message });
        }
    },
    createTask: async function(request, response) {
        try {
            const task = await TaskService.createTask(request.body);
            response.json({ status: 201, data: task.id });
        } catch (error) {
            response.json({ status: error.code, message: error.message });
        }
    },
    updateTask: async function(request, response) {
        try {
            const task = await TaskService.updateTask(request.body);
            response.json({ status: 200, data: task })
        } catch (error) {
            response.json({ status: error.code, message: error.message });
        }
    },
    deleteTask: async function(request, response) {
        try {
            const task = await TaskService.deleteTask(request.params.id);
            response.json({ status: 200, data: task.deleted });
        } catch (error) {
            response.json({ status: error.code, message: error.message });
        }
    }
};

export default TaskController;