import { Router } from 'express';
import { SprintController } from '../controllers/sprintController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/sprint - Get all sprint
router.get('/', SprintController.getAll);

// GET /api/sprint/:id - Get sprint by id
router.get('/:id', SprintController.getById);

// POST /api/sprint - Create new sprint
router.post('/', SprintController.create);

// PUT /api/sprint/:id - Update sprint
router.put('/:id', SprintController.update);

// DELETE /api/sprint/:id - Delete sprint
router.delete('/:id', SprintController.delete);

export default router;
