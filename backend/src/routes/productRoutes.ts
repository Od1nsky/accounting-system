import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/product - Get all product
router.get('/', ProductController.getAll);

// GET /api/product/:id - Get product by id
router.get('/:id', ProductController.getById);

// POST /api/product - Create new product
router.post('/', ProductController.create);

// PUT /api/product/:id - Update product
router.put('/:id', ProductController.update);

// DELETE /api/product/:id - Delete product
router.delete('/:id', ProductController.delete);

export default router;
