import { Router } from 'express';
import { PaymentController } from '../controllers/paymentController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/payment - Get all payment
router.get('/', PaymentController.getAll);

// GET /api/payment/:id - Get payment by id
router.get('/:id', PaymentController.getById);

// POST /api/payment - Create new payment
router.post('/', PaymentController.create);

// PUT /api/payment/:id - Update payment
router.put('/:id', PaymentController.update);

// DELETE /api/payment/:id - Delete payment
router.delete('/:id', PaymentController.delete);

export default router;
