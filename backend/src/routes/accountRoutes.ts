import { Router } from 'express';
import { AccountController } from '../controllers/accountController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/account - Get all account
router.get('/', AccountController.getAll);

// GET /api/account/:id - Get account by id
router.get('/:id', AccountController.getById);

// POST /api/account - Create new account
router.post('/', AccountController.create);

// PUT /api/account/:id - Update account
router.put('/:id', AccountController.update);

// DELETE /api/account/:id - Delete account
router.delete('/:id', AccountController.delete);

export default router;
