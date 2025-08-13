import TaskService from "../service/task.service.js";

const TaskController = {
    getTaskById: async function(request, response, next) {
        try {
            const task = await TaskService.getTaskById(request.params.id);
            response.json({ status: 200, data: task });
        } catch (error) { return next(error); }
    },
    getAllTasks: async function(request, response, next) {
        try {
            const tasks = await TaskService.getAllTasks();
            response.json({ status: 200, data: tasks });
        } catch (error) { return next(error); }
    },
    createTask: async function(request, response, next) {
        try {
            const task = await TaskService.createTask(request.body);
            response.json({ status: 201, data: task.id });
        } catch (error) { return next(error); }
    },
    updateTask: async function(request, response, next) {
        try {
            const task = await TaskService.updateTask(request.body);
            response.json({ status: 200, data: task })
        } catch (error) { return next(error); }
    },
    deleteTask: async function(request, response, next) {
        try {
            const task = await TaskService.deleteTask(request.params.id);
            response.json({ status: 200, data: task.deleted });
        } catch (error) { return next(error); }
    }
};

export default TaskController;