import express from 'express';
import {TaskController} from '../app/controllers/TaskController.js';
import {TaskTypeController} from '../app/controllers/TaskTypeController.js';

const router = express.Router();

// Task routes
router.get('/tasks', TaskController.index);
router.post('/tasks', TaskController.insert);
router.get('/tasks/:id', TaskController.show);
router.put('/tasks/:id', TaskController.update);
router.delete('/tasks/:id', TaskController.remove);

// Task Type routes
router.get('/task-types', TaskTypeController.index);




export default router;