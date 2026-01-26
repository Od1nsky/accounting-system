import { Router } from 'express';
import { ContractController } from '../controllers/contractController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/contract - Get all contract
router.get('/', ContractController.getAll);

// GET /api/contract/:id - Get contract by id
router.get('/:id', ContractController.getById);

// POST /api/contract - Create new contract
router.post('/', ContractController.create);

// PUT /api/contract/:id - Update contract
router.put('/:id', ContractController.update);

// DELETE /api/contract/:id - Delete contract
router.delete('/:id', ContractController.delete);

export default router;
