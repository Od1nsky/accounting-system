import { Router } from 'express';
import { ProjectExpenseController } from '../controllers/projectexpenseController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/projectexpense - Get all projectexpense
router.get('/', ProjectExpenseController.getAll);

// GET /api/projectexpense/:id - Get projectexpense by id
router.get('/:id', ProjectExpenseController.getById);

// POST /api/projectexpense - Create new projectexpense
router.post('/', ProjectExpenseController.create);

// PUT /api/projectexpense/:id - Update projectexpense
router.put('/:id', ProjectExpenseController.update);

// DELETE /api/projectexpense/:id - Delete projectexpense
router.delete('/:id', ProjectExpenseController.delete);

export default router;
