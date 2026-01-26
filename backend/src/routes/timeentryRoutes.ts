import { Router } from 'express';
import { TimeEntryController } from '../controllers/timeentryController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/timeentry - Get all timeentry
router.get('/', TimeEntryController.getAll);

// GET /api/timeentry/:id - Get timeentry by id
router.get('/:id', TimeEntryController.getById);

// POST /api/timeentry - Create new timeentry
router.post('/', TimeEntryController.create);

// PUT /api/timeentry/:id - Update timeentry
router.put('/:id', TimeEntryController.update);

// DELETE /api/timeentry/:id - Delete timeentry
router.delete('/:id', TimeEntryController.delete);

export default router;
