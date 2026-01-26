import { Router } from 'express';
import { TransactionController } from '../controllers/transactionController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/transaction - Get all transaction
router.get('/', TransactionController.getAll);

// GET /api/transaction/:id - Get transaction by id
router.get('/:id', TransactionController.getById);

// POST /api/transaction - Create new transaction
router.post('/', TransactionController.create);

// PUT /api/transaction/:id - Update transaction
router.put('/:id', TransactionController.update);

// DELETE /api/transaction/:id - Delete transaction
router.delete('/:id', TransactionController.delete);

export default router;
