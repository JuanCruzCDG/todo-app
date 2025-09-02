import TaskController from "../controller/task.controller.js";
import express from "express";

const TaskRouter = new express.Router();

TaskRouter.get('/task', TaskController.getAllTasks);
TaskRouter.get('/task/:id', TaskController.getTaskById);
TaskRouter.get('/task/:id/view', TaskController.showTask);
TaskRouter.get('/task/create', TaskController.showCreateForm);
TaskRouter.post('/task/new', express.json(), express.urlencoded({ extended: true }), TaskController.createTask);
TaskRouter.put('/task/:id/update', express.json(), TaskController.updateTask);
TaskRouter.delete('/task/:id/delete', express.json(), TaskController.deleteTask);

export default TaskRouter;