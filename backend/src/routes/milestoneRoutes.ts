import { Router } from 'express';
import { MilestoneController } from '../controllers/milestoneController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/milestone - Get all milestone
router.get('/', MilestoneController.getAll);

// GET /api/milestone/:id - Get milestone by id
router.get('/:id', MilestoneController.getById);

// POST /api/milestone - Create new milestone
router.post('/', MilestoneController.create);

// PUT /api/milestone/:id - Update milestone
router.put('/:id', MilestoneController.update);

// DELETE /api/milestone/:id - Delete milestone
router.delete('/:id', MilestoneController.delete);

export default router;
