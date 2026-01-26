import { Router } from 'express';
import { EmployeeController } from '../controllers/employeeController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/employee - Get all employee
router.get('/', EmployeeController.getAll);

// GET /api/employee/:id - Get employee by id
router.get('/:id', EmployeeController.getById);

// POST /api/employee - Create new employee
router.post('/', EmployeeController.create);

// PUT /api/employee/:id - Update employee
router.put('/:id', EmployeeController.update);

// DELETE /api/employee/:id - Delete employee
router.delete('/:id', EmployeeController.delete);

export default router;
