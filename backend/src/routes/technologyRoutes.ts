import { Router } from 'express';
import { TechnologyController } from '../controllers/technologyController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/technology - Get all technology
router.get('/', TechnologyController.getAll);

// GET /api/technology/:id - Get technology by id
router.get('/:id', TechnologyController.getById);

// POST /api/technology - Create new technology
router.post('/', TechnologyController.create);

// PUT /api/technology/:id - Update technology
router.put('/:id', TechnologyController.update);

// DELETE /api/technology/:id - Delete technology
router.delete('/:id', TechnologyController.delete);

export default router;
