import { Router } from 'express';
import { RepositoryController } from '../controllers/repositoryController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/repository - Get all repository
router.get('/', RepositoryController.getAll);

// GET /api/repository/:id - Get repository by id
router.get('/:id', RepositoryController.getById);

// POST /api/repository - Create new repository
router.post('/', RepositoryController.create);

// PUT /api/repository/:id - Update repository
router.put('/:id', RepositoryController.update);

// DELETE /api/repository/:id - Delete repository
router.delete('/:id', RepositoryController.delete);

export default router;
