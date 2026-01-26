import express from 'express';
import cors from 'cors';
import { config } from './config';
import { initDatabase } from './database/init';
import authRoutes from './routes/authRoutes';
import accountRoutes from './routes/accountRoutes';
import transactionRoutes from './routes/transactionRoutes';
import counterpartyRoutes from './routes/counterpartyRoutes';
import contractRoutes from './routes/contractRoutes';
import invoiceRoutes from './routes/invoiceRoutes';
import paymentRoutes from './routes/paymentRoutes';
import cashOperationRoutes from './routes/cashOperationRoutes';
import bankOperationRoutes from './routes/bankOperationRoutes';
import productRoutes from './routes/productRoutes';
import warehouseOperationRoutes from './routes/warehouseOperationRoutes';
import inventoryRoutes from './routes/inventoryRoutes';
import employeeRoutes from './routes/employeeRoutes';
import salaryPaymentRoutes from './routes/salaryPaymentRoutes';
import taxRecordRoutes from './routes/taxRecordRoutes';
import budgetRoutes from './routes/budgetRoutes';
import assetRoutes from './routes/assetRoutes';
import depreciationRoutes from './routes/depreciationRoutes';
import reconciliationRoutes from './routes/reconciliationRoutes';
import projectRoutes from './routes/projectRoutes';
import clientRoutes from './routes/clientRoutes';
import taskRoutes from './routes/taskRoutes';
import timeEntryRoutes from './routes/timeEntryRoutes';
import sprintRoutes from './routes/sprintRoutes';
import repositoryRoutes from './routes/repositoryRoutes';
import technologyRoutes from './routes/technologyRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';
import projectExpenseRoutes from './routes/projectExpenseRoutes';
import milestoneRoutes from './routes/milestoneRoutes';
import itReportRoutes from './routes/itReportRoutes';
import { setupSwagger } from './swagger';
import { errorHandler } from './middleware/errorHandler';

// Initialize Database
initDatabase();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Setup Swagger documentation
setupSwagger(app);


// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// API Routes
app.use('/api/auth', authRoutes);

// Accounting Routes
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/counterparties', counterpartyRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/cash-operations', cashOperationRoutes);
app.use('/api/bank-operations', bankOperationRoutes);
app.use('/api/products', productRoutes);
app.use('/api/warehouse-operations', warehouseOperationRoutes);
app.use('/api/inventories', inventoryRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/salary-payments', salaryPaymentRoutes);
app.use('/api/tax-records', taxRecordRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/depreciations', depreciationRoutes);
app.use('/api/reconciliations', reconciliationRoutes);

// IT Company & Project Management Routes
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/time-entries', timeEntryRoutes);
app.use('/api/sprints', sprintRoutes);
app.use('/api/repositories', repositoryRoutes);
app.use('/api/technologies', technologyRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/project-expenses', projectExpenseRoutes);
app.use('/api/milestones', milestoneRoutes);

// IT Reports
app.use('/api/it-reports', itReportRoutes);

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
