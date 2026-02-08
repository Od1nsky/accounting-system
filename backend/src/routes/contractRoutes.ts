import { Router } from 'express';
import { body } from 'express-validator';
import { ContractController } from '../controllers/contractController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validation';

const router = Router();

// Правила валидации (общие ограничения по БД: number/type/status VARCHAR(255), amount INTEGER)
const numberRule = (required: boolean) =>
  required
    ? body('number').trim().notEmpty().withMessage('Номер контракта обязателен').isLength({ max: 255 }).withMessage('Максимум 255 символов')
    : body('number').optional().trim().isLength({ max: 255 }).withMessage('Максимум 255 символов');
const counterpartyIdRule = (required: boolean) =>
  required
    ? body('counterpartyId').isInt({ min: 1 }).withMessage('Укажите корректного контрагента (целое число > 0)').toInt()
    : body('counterpartyId').optional().isInt({ min: 1 }).withMessage('Укажите корректного контрагента (целое число > 0)').toInt();
const typeRule = () => body('type').optional().trim().isLength({ max: 255 }).withMessage('Максимум 255 символов');
const signDateRule = () => body('signDate').optional({ values: 'falsy' }).isISO8601().withMessage('Некорректная дата подписания');
const startDateRule = () => body('startDate').optional({ values: 'falsy' }).isISO8601().withMessage('Некорректная дата начала');
const endDateRule = () => body('endDate').optional({ values: 'falsy' }).isISO8601().withMessage('Некорректная дата окончания');
const amountRule = () => body('amount').optional({ values: 'falsy' }).isInt({ min: 0 }).withMessage('Сумма должна быть целым числом ≥ 0').toInt();
const statusRule = () => body('status').optional().trim().isLength({ max: 255 }).withMessage('Максимум 255 символов');
const descriptionRule = () => body('description').optional().trim();

const createContractValidation = [
  numberRule(true),
  counterpartyIdRule(true),
  typeRule(),
  signDateRule(),
  startDateRule(),
  endDateRule(),
  amountRule(),
  statusRule(),
  descriptionRule(),
  validate,
];

const updateContractValidation = [
  numberRule(false),
  counterpartyIdRule(false),
  typeRule(),
  signDateRule(),
  startDateRule(),
  endDateRule(),
  amountRule(),
  statusRule(),
  descriptionRule(),
  validate,
];

// All routes require authentication
router.use(authenticate);

// GET /api/contracts - Get all contract
router.get('/', ContractController.getAll);

// GET /api/contracts/:id - Get contract by id
router.get('/:id', ContractController.getById);

// POST /api/contracts - Create new contract
router.post('/', createContractValidation, ContractController.create);

// PUT /api/contracts/:id - Update contract
router.put('/:id', updateContractValidation, ContractController.update);

// DELETE /api/contracts/:id - Delete contract
router.delete('/:id', ContractController.delete);

export default router;
