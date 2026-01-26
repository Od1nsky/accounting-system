import { Router } from 'express';
import { BankOperationController } from '../controllers/bankoperationController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/bankoperation - Get all bankoperation
router.get('/', BankOperationController.getAll);

// GET /api/bankoperation/:id - Get bankoperation by id
router.get('/:id', BankOperationController.getById);

// POST /api/bankoperation - Create new bankoperation
router.post('/', BankOperationController.create);

// PUT /api/bankoperation/:id - Update bankoperation
router.put('/:id', BankOperationController.update);

// DELETE /api/bankoperation/:id - Delete bankoperation
router.delete('/:id', BankOperationController.delete);

export default router;
