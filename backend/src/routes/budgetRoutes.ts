import { Router } from 'express';
import { BudgetController } from '../controllers/budgetController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/budget - Get all budget
router.get('/', BudgetController.getAll);

// GET /api/budget/:id - Get budget by id
router.get('/:id', BudgetController.getById);

// POST /api/budget - Create new budget
router.post('/', BudgetController.create);

// PUT /api/budget/:id - Update budget
router.put('/:id', BudgetController.update);

// DELETE /api/budget/:id - Delete budget
router.delete('/:id', BudgetController.delete);

export default router;
