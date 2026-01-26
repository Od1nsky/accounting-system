import { Router } from 'express';
import { CounterpartyController } from '../controllers/counterpartyController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/counterparty - Get all counterparty
router.get('/', CounterpartyController.getAll);

// GET /api/counterparty/:id - Get counterparty by id
router.get('/:id', CounterpartyController.getById);

// POST /api/counterparty - Create new counterparty
router.post('/', CounterpartyController.create);

// PUT /api/counterparty/:id - Update counterparty
router.put('/:id', CounterpartyController.update);

// DELETE /api/counterparty/:id - Delete counterparty
router.delete('/:id', CounterpartyController.delete);

export default router;
