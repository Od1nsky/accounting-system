import { Router } from 'express';
import { AssetController } from '../controllers/assetController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/asset - Get all asset
router.get('/', AssetController.getAll);

// GET /api/asset/:id - Get asset by id
router.get('/:id', AssetController.getById);

// POST /api/asset - Create new asset
router.post('/', AssetController.create);

// PUT /api/asset/:id - Update asset
router.put('/:id', AssetController.update);

// DELETE /api/asset/:id - Delete asset
router.delete('/:id', AssetController.delete);

export default router;
