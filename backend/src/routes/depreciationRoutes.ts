import { Router } from 'express';
import { DepreciationController } from '../controllers/depreciationController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/depreciation - Get all depreciation
router.get('/', DepreciationController.getAll);

// GET /api/depreciation/:id - Get depreciation by id
router.get('/:id', DepreciationController.getById);

// POST /api/depreciation - Create new depreciation
router.post('/', DepreciationController.create);

// PUT /api/depreciation/:id - Update depreciation
router.put('/:id', DepreciationController.update);

// DELETE /api/depreciation/:id - Delete depreciation
router.delete('/:id', DepreciationController.delete);

export default router;
