import { Router } from 'express';
import { SalaryPaymentController } from '../controllers/salarypaymentController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/salarypayment - Get all salarypayment
router.get('/', SalaryPaymentController.getAll);

// GET /api/salarypayment/:id - Get salarypayment by id
router.get('/:id', SalaryPaymentController.getById);

// POST /api/salarypayment - Create new salarypayment
router.post('/', SalaryPaymentController.create);

// PUT /api/salarypayment/:id - Update salarypayment
router.put('/:id', SalaryPaymentController.update);

// DELETE /api/salarypayment/:id - Delete salarypayment
router.delete('/:id', SalaryPaymentController.delete);

export default router;
