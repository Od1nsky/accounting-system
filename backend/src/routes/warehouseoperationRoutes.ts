import { Router } from 'express';
import { WarehouseOperationController } from '../controllers/warehouseoperationController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/warehouseoperation - Get all warehouseoperation
router.get('/', WarehouseOperationController.getAll);

// GET /api/warehouseoperation/:id - Get warehouseoperation by id
router.get('/:id', WarehouseOperationController.getById);

// POST /api/warehouseoperation - Create new warehouseoperation
router.post('/', WarehouseOperationController.create);

// PUT /api/warehouseoperation/:id - Update warehouseoperation
router.put('/:id', WarehouseOperationController.update);

// DELETE /api/warehouseoperation/:id - Delete warehouseoperation
router.delete('/:id', WarehouseOperationController.delete);

export default router;
