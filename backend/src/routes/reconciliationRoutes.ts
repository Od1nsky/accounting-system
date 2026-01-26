import { Router } from 'express';
import { ReconciliationController } from '../controllers/reconciliationController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/reconciliation - Get all reconciliation
router.get('/', ReconciliationController.getAll);

// GET /api/reconciliation/:id - Get reconciliation by id
router.get('/:id', ReconciliationController.getById);

// POST /api/reconciliation - Create new reconciliation
router.post('/', ReconciliationController.create);

// PUT /api/reconciliation/:id - Update reconciliation
router.put('/:id', ReconciliationController.update);

// DELETE /api/reconciliation/:id - Delete reconciliation
router.delete('/:id', ReconciliationController.delete);

export default router;
