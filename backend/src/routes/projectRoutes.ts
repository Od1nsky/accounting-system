import { Router } from 'express';
import { ProjectController } from '../controllers/projectController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/project - Get all project
router.get('/', ProjectController.getAll);

// GET /api/project/:id - Get project by id
router.get('/:id', ProjectController.getById);

// POST /api/project - Create new project
router.post('/', ProjectController.create);

// PUT /api/project/:id - Update project
router.put('/:id', ProjectController.update);

// DELETE /api/project/:id - Delete project
router.delete('/:id', ProjectController.delete);

export default router;
