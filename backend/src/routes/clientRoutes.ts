import { Router } from 'express';
import { ClientController } from '../controllers/clientController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/client - Get all client
router.get('/', ClientController.getAll);

// GET /api/client/:id - Get client by id
router.get('/:id', ClientController.getById);

// POST /api/client - Create new client
router.post('/', ClientController.create);

// PUT /api/client/:id - Update client
router.put('/:id', ClientController.update);

// DELETE /api/client/:id - Delete client
router.delete('/:id', ClientController.delete);

export default router;
