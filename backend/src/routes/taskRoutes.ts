import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/task - Get all task
router.get('/', TaskController.getAll);

// GET /api/task/:id - Get task by id
router.get('/:id', TaskController.getById);

// POST /api/task - Create new task
router.post('/', TaskController.create);

// PUT /api/task/:id - Update task
router.put('/:id', TaskController.update);

// DELETE /api/task/:id - Delete task
router.delete('/:id', TaskController.delete);

export default router;
