import { Router } from 'express';
import { InventoryController } from '../controllers/inventoryController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/inventory - Get all inventory
router.get('/', InventoryController.getAll);

// GET /api/inventory/:id - Get inventory by id
router.get('/:id', InventoryController.getById);

// POST /api/inventory - Create new inventory
router.post('/', InventoryController.create);

// PUT /api/inventory/:id - Update inventory
router.put('/:id', InventoryController.update);

// DELETE /api/inventory/:id - Delete inventory
router.delete('/:id', InventoryController.delete);

export default router;
