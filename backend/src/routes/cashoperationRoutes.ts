import { Router } from 'express';
import { CashOperationController } from '../controllers/cashoperationController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/cashoperation - Get all cashoperation
router.get('/', CashOperationController.getAll);

// GET /api/cashoperation/:id - Get cashoperation by id
router.get('/:id', CashOperationController.getById);

// POST /api/cashoperation - Create new cashoperation
router.post('/', CashOperationController.create);

// PUT /api/cashoperation/:id - Update cashoperation
router.put('/:id', CashOperationController.update);

// DELETE /api/cashoperation/:id - Delete cashoperation
router.delete('/:id', CashOperationController.delete);

export default router;
