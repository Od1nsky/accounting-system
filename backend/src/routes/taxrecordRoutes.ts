import { Router } from 'express';
import { TaxRecordController } from '../controllers/taxrecordController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/taxrecord - Get all taxrecord
router.get('/', TaxRecordController.getAll);

// GET /api/taxrecord/:id - Get taxrecord by id
router.get('/:id', TaxRecordController.getById);

// POST /api/taxrecord - Create new taxrecord
router.post('/', TaxRecordController.create);

// PUT /api/taxrecord/:id - Update taxrecord
router.put('/:id', TaxRecordController.update);

// DELETE /api/taxrecord/:id - Delete taxrecord
router.delete('/:id', TaxRecordController.delete);

export default router;
