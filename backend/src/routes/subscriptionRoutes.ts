import { Router } from 'express';
import { SubscriptionController } from '../controllers/subscriptionController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/subscription - Get all subscription
router.get('/', SubscriptionController.getAll);

// GET /api/subscription/:id - Get subscription by id
router.get('/:id', SubscriptionController.getById);

// POST /api/subscription - Create new subscription
router.post('/', SubscriptionController.create);

// PUT /api/subscription/:id - Update subscription
router.put('/:id', SubscriptionController.update);

// DELETE /api/subscription/:id - Delete subscription
router.delete('/:id', SubscriptionController.delete);

export default router;
