import { Router } from 'express';
import { InvoiceController } from '../controllers/invoiceController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/invoice - Get all invoice
router.get('/', InvoiceController.getAll);

// GET /api/invoice/:id - Get invoice by id
router.get('/:id', InvoiceController.getById);

// POST /api/invoice - Create new invoice
router.post('/', InvoiceController.create);

// PUT /api/invoice/:id - Update invoice
router.put('/:id', InvoiceController.update);

// DELETE /api/invoice/:id - Delete invoice
router.delete('/:id', InvoiceController.delete);

export default router;
