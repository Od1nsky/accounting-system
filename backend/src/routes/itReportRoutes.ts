import { Router } from 'express';
import { ITReportController } from '../controllers/itReportController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Project & Financial Reports
router.get('/project-profitability', ITReportController.getProjectProfitability);
router.get('/client-revenue', ITReportController.getClientRevenue);
router.get('/milestone-tracking', ITReportController.getMilestoneTracking);

// Team & Time Reports
router.get('/team-utilization', ITReportController.getTeamUtilization);
router.get('/time-tracking', ITReportController.getTimeTracking);
router.get('/sprint-performance', ITReportController.getSprintPerformance);
router.get('/task-metrics', ITReportController.getTaskMetrics);

// Technology & Infrastructure Reports
router.get('/technology-stack', ITReportController.getTechnologyStack);
router.get('/subscription-costs', ITReportController.getSubscriptionCosts);

// Dashboard
router.get('/dashboard', ITReportController.getITDashboard);

export default router;
