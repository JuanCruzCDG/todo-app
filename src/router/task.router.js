import TaskController from "../controller/task.controller.js";
import { Router } from "express";

const TaskRouter = new Router();

TaskRouter.get('/task', TaskController.getAllTasks);
TaskRouter.get('/task/:id', TaskController.getTaskById);
TaskRouter.post('/task/new', TaskController.createTask);
TaskRouter.put('/task/:id/update', TaskController.updateTask);
TaskRouter.delete('/task/:id/delete', TaskController.deleteTask);

export default TaskRouter;