import { Request, Response } from 'express';
import { db } from '../database/init';

export class ITReportController {
  // Project Profitability Report
  static getProjectProfitability(req: Request, res: Response) {
    try {
      const { projectId } = req.query;

      const query = `
        SELECT
          p.*,
          c.name as clientName,
          COALESCE(SUM(te.hours * te.hourlyRate), 0) as totalBilled,
          COALESCE(SUM(te.hours), 0) as totalHours,
          COALESCE(SUM(pe.amount), 0) as totalExpenses,
          (COALESCE(SUM(te.hours * te.hourlyRate), 0) - COALESCE(SUM(pe.amount), 0)) as profit,
          COUNT(DISTINCT t.id) as totalTasks,
          COUNT(DISTINCT CASE WHEN t.status = 'completed' THEN t.id END) as completedTasks
        FROM project p
        LEFT JOIN client c ON p.clientId = c.id
        LEFT JOIN timeEntry te ON p.id = te.projectId
        LEFT JOIN projectExpense pe ON p.id = pe.projectId
        LEFT JOIN task t ON p.id = t.projectId
        ${projectId ? 'WHERE p.id = ?' : ''}
        GROUP BY p.id
        ORDER BY profit DESC
      `;

      const projects = db.prepare(query).all(projectId ? [projectId] : []);

      const summary = {
        totalProjects: projects.length,
        totalRevenue: 0,
        totalExpenses: 0,
        totalProfit: 0,
        totalHours: 0,
        avgProfitMargin: 0
      };

      projects.forEach((project: any) => {
        summary.totalRevenue += project.totalBilled;
        summary.totalExpenses += project.totalExpenses;
        summary.totalProfit += project.profit;
        summary.totalHours += project.totalHours;
      });

      if (summary.totalRevenue > 0) {
        summary.avgProfitMargin = (summary.totalProfit / summary.totalRevenue) * 100;
      }

      res.json({ projects, summary });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Team Utilization Report
  static getTeamUtilization(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;

      const query = `
        SELECT
          e.id,
          e.firstName,
          e.lastName,
          e.position,
          e.department,
          COALESCE(SUM(te.hours), 0) as totalHours,
          COALESCE(SUM(CASE WHEN te.billable = true THEN te.hours ELSE 0 END), 0) as billableHours,
          COALESCE(SUM(CASE WHEN te.billable = false THEN te.hours ELSE 0 END), 0) as nonBillableHours,
          COALESCE(SUM(te.hours * te.hourlyRate), 0) as totalRevenue,
          COUNT(DISTINCT te.projectId) as projectsWorked
        FROM employee e
        LEFT JOIN timeEntry te ON e.id = te.employeeId
          ${startDate ? 'AND te.date >= ?' : ''}
          ${endDate ? 'AND te.date <= ?' : ''}
        WHERE e.isActive = true
        GROUP BY e.id
        ORDER BY totalHours DESC
      `;

      const params = [startDate, endDate].filter(Boolean);
      const team = db.prepare(query).all(...params);

      const summary = {
        totalEmployees: team.length,
        totalHours: 0,
        totalBillableHours: 0,
        totalNonBillableHours: 0,
        totalRevenue: 0,
        avgUtilization: 0
      };

      team.forEach((member: any) => {
        summary.totalHours += member.totalHours;
        summary.totalBillableHours += member.billableHours;
        summary.totalNonBillableHours += member.nonBillableHours;
        summary.totalRevenue += member.totalRevenue;
      });

      if (summary.totalHours > 0) {
        summary.avgUtilization = (summary.totalBillableHours / summary.totalHours) * 100;
      }

      res.json({
        period: { startDate, endDate },
        team,
        summary
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Time Tracking Report
  static getTimeTracking(req: Request, res: Response) {
    try {
      const { projectId, employeeId, startDate, endDate } = req.query;

      let whereConditions = ['1=1'];
      const params: any[] = [];

      if (projectId) {
        whereConditions.push('te.projectId = ?');
        params.push(projectId);
      }
      if (employeeId) {
        whereConditions.push('te.employeeId = ?');
        params.push(employeeId);
      }
      if (startDate) {
        whereConditions.push('te.date >= ?');
        params.push(startDate);
      }
      if (endDate) {
        whereConditions.push('te.date <= ?');
        params.push(endDate);
      }

      const query = `
        SELECT
          te.*,
          e.firstName || ' ' || e.lastName as employeeName,
          p.name as projectName,
          t.title as taskTitle
        FROM timeEntry te
        JOIN employee e ON te.employeeId = e.id
        LEFT JOIN project p ON te.projectId = p.id
        LEFT JOIN task t ON te.taskId = t.id
        WHERE ${whereConditions.join(' AND ')}
        ORDER BY te.date DESC, te.id DESC
      `;

      const entries = db.prepare(query).all(...params);

      const summary = {
        totalEntries: entries.length,
        totalHours: 0,
        billableHours: 0,
        nonBillableHours: 0,
        totalAmount: 0
      };

      entries.forEach((entry: any) => {
        summary.totalHours += entry.hours;
        if (entry.billable) {
          summary.billableHours += entry.hours;
          summary.totalAmount += entry.hours * entry.hourlyRate;
        } else {
          summary.nonBillableHours += entry.hours;
        }
      });

      res.json({ entries, summary });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Sprint Performance Report
  static getSprintPerformance(req: Request, res: Response) {
    try {
      const { projectId } = req.query;

      const query = `
        SELECT
          s.*,
          p.name as projectName,
          COUNT(DISTINCT t.id) as totalTasks,
          COUNT(DISTINCT CASE WHEN t.status = 'completed' THEN t.id END) as completedTasks,
          COALESCE(SUM(t.estimatedHours), 0) as plannedHours,
          COALESCE(SUM(t.actualHours), 0) as actualHours
        FROM sprint s
        JOIN project p ON s.projectId = p.id
        LEFT JOIN task t ON s.projectId = t.projectId
        ${projectId ? 'WHERE s.projectId = ?' : ''}
        GROUP BY s.id
        ORDER BY s.startDate DESC
      `;

      const sprints = db.prepare(query).all(projectId ? [projectId] : []);

      sprints.forEach((sprint: any) => {
        sprint.completionRate = sprint.totalTasks > 0
          ? (sprint.completedTasks / sprint.totalTasks) * 100
          : 0;
        sprint.velocityAchieved = sprint.completedTasks;
      });

      res.json({ sprints });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Client Revenue Report
  static getClientRevenue(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;

      const query = `
        SELECT
          c.*,
          COUNT(DISTINCT p.id) as totalProjects,
          COUNT(DISTINCT CASE WHEN p.status = 'active' THEN p.id END) as activeProjects,
          COALESCE(SUM(i.totalAmount), 0) as totalInvoiced,
          COALESCE(SUM(CASE WHEN i.paid = true THEN i.totalAmount ELSE 0 END), 0) as totalPaid,
          COALESCE(SUM(CASE WHEN i.paid = false THEN i.totalAmount ELSE 0 END), 0) as totalOutstanding
        FROM client c
        LEFT JOIN project p ON c.id = p.clientId
        LEFT JOIN invoice i ON c.id = i.counterpartyId
          ${startDate ? 'AND i.date >= ?' : ''}
          ${endDate ? 'AND i.date <= ?' : ''}
        WHERE c.isActive = true
        GROUP BY c.id
        ORDER BY totalInvoiced DESC
      `;

      const params = [startDate, endDate].filter(Boolean);
      const clients = db.prepare(query).all(...params);

      const summary = {
        totalClients: clients.length,
        totalRevenue: 0,
        totalPaid: 0,
        totalOutstanding: 0,
        avgRevenuePerClient: 0
      };

      clients.forEach((client: any) => {
        summary.totalRevenue += client.totalInvoiced;
        summary.totalPaid += client.totalPaid;
        summary.totalOutstanding += client.totalOutstanding;
      });

      if (summary.totalClients > 0) {
        summary.avgRevenuePerClient = summary.totalRevenue / summary.totalClients;
      }

      res.json({
        period: { startDate, endDate },
        clients,
        summary
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Technology Stack Report
  static getTechnologyStack(req: Request, res: Response) {
    try {
      const technologies = db.prepare(`
        SELECT
          t.*,
          COUNT(DISTINCT p.id) as projectsUsing
        FROM technology t
        LEFT JOIN project p ON p.repository LIKE '%' || t.name || '%'
        WHERE t.isActive = true
        GROUP BY t.id
        ORDER BY projectsUsing DESC, t.category, t.name
      `).all();

      const byCategory = technologies.reduce((acc: any, tech: any) => {
        if (!acc[tech.category]) {
          acc[tech.category] = [];
        }
        acc[tech.category].push(tech);
        return acc;
      }, {});

      res.json({
        technologies,
        byCategory,
        totalTechnologies: technologies.length
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Subscription Costs Report
  static getSubscriptionCosts(req: Request, res: Response) {
    try {
      const subscriptions = db.prepare(`
        SELECT *
        FROM subscription
        WHERE status = 'active'
        ORDER BY cost DESC
      `).all();

      const summary = {
        totalSubscriptions: subscriptions.length,
        monthlyTotal: 0,
        yearlyTotal: 0,
        byType: {} as any
      };

      subscriptions.forEach((sub: any) => {
        let monthlyCost = 0;
        if (sub.billingPeriod === 'monthly') {
          monthlyCost = sub.cost;
        } else if (sub.billingPeriod === 'yearly') {
          monthlyCost = sub.cost / 12;
        }

        summary.monthlyTotal += monthlyCost;
        summary.yearlyTotal += monthlyCost * 12;

        if (!summary.byType[sub.type]) {
          summary.byType[sub.type] = { count: 0, monthlyCost: 0, yearlyCost: 0 };
        }
        summary.byType[sub.type].count++;
        summary.byType[sub.type].monthlyCost += monthlyCost;
        summary.byType[sub.type].yearlyCost += monthlyCost * 12;
      });

      res.json({
        subscriptions,
        summary
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // IT Dashboard
  static getITDashboard(req: Request, res: Response) {
    try {
      const today = new Date().toISOString().split('T')[0];
      const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];

      const stats = {
        projects: {
          total: db.prepare('SELECT COUNT(*) as count FROM project').get(),
          active: db.prepare('SELECT COUNT(*) as count FROM project WHERE status = "active"').get(),
          completed: db.prepare('SELECT COUNT(*) as count FROM project WHERE status = "completed"').get(),
        },
        clients: {
          total: db.prepare('SELECT COUNT(*) as count FROM client WHERE isActive = true').get(),
          active: db.prepare('SELECT COUNT(DISTINCT clientId) as count FROM project WHERE status = "active"').get(),
        },
        tasks: {
          total: db.prepare('SELECT COUNT(*) as count FROM task').get(),
          inProgress: db.prepare('SELECT COUNT(*) as count FROM task WHERE status = "in_progress"').get(),
          completed: db.prepare('SELECT COUNT(*) as count FROM task WHERE status = "completed"').get(),
          overdue: db.prepare('SELECT COUNT(*) as count FROM task WHERE status != "completed" AND dueDate < ?').get(today),
        },
        team: {
          total: db.prepare('SELECT COUNT(*) as count FROM employee WHERE isActive = true').get(),
          hoursThisMonth: db.prepare('SELECT COALESCE(SUM(hours), 0) as total FROM timeEntry WHERE date >= ?').get(monthStart),
          billableHoursThisMonth: db.prepare('SELECT COALESCE(SUM(hours), 0) as total FROM timeEntry WHERE date >= ? AND billable = true').get(monthStart),
        },
        financial: {
          monthlyRevenue: db.prepare(`
            SELECT COALESCE(SUM(hours * hourlyRate), 0) as total
            FROM timeEntry
            WHERE date >= ? AND billable = true
          `).get(monthStart),
          unpaidInvoices: db.prepare(`
            SELECT COALESCE(SUM(totalAmount), 0) as total
            FROM invoice
            WHERE paid = false
          `).get(),
          monthlySubscriptionCost: db.prepare(`
            SELECT COALESCE(SUM(
              CASE
                WHEN billingPeriod = 'monthly' THEN cost
                WHEN billingPeriod = 'yearly' THEN cost / 12
                ELSE 0
              END
            ), 0) as total
            FROM subscription
            WHERE status = 'active'
          `).get(),
        },
        repositories: db.prepare('SELECT COUNT(*) as count FROM repository WHERE status = "active"').get(),
        technologies: db.prepare('SELECT COUNT(*) as count FROM technology WHERE isActive = true').get(),
        subscriptions: db.prepare('SELECT COUNT(*) as count FROM subscription WHERE status = "active"').get(),
      };

      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Task Performance Metrics
  static getTaskMetrics(req: Request, res: Response) {
    try {
      const { projectId, startDate, endDate } = req.query;

      let whereConditions = ['1=1'];
      const params: any[] = [];

      if (projectId) {
        whereConditions.push('projectId = ?');
        params.push(projectId);
      }
      if (startDate) {
        whereConditions.push('startDate >= ?');
        params.push(startDate);
      }
      if (endDate) {
        whereConditions.push('startDate <= ?');
        params.push(endDate);
      }

      const query = `
        SELECT
          status,
          priority,
          type,
          COUNT(*) as count,
          AVG(actualHours) as avgActualHours,
          AVG(estimatedHours) as avgEstimatedHours,
          AVG(CASE WHEN actualHours > 0 AND estimatedHours > 0
              THEN (actualHours - estimatedHours) / estimatedHours * 100
              ELSE 0 END) as avgVariance
        FROM task
        WHERE ${whereConditions.join(' AND ')}
        GROUP BY status, priority, type
      `;

      const metrics = db.prepare(query).all(...params);

      res.json({ metrics });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Milestone Tracking Report
  static getMilestoneTracking(req: Request, res: Response) {
    try {
      const { projectId } = req.query;

      const query = `
        SELECT
          m.*,
          p.name as projectName,
          c.name as clientName
        FROM milestone m
        JOIN project p ON m.projectId = p.id
        JOIN client c ON p.clientId = c.id
        ${projectId ? 'WHERE m.projectId = ?' : ''}
        ORDER BY m.dueDate
      `;

      const milestones = db.prepare(query).all(projectId ? [projectId] : []);

      const summary = {
        total: milestones.length,
        completed: 0,
        pending: 0,
        overdue: 0,
        totalPayment: 0,
        paidAmount: 0,
        unpaidAmount: 0
      };

      const today = new Date().toISOString().split('T')[0];

      milestones.forEach((milestone: any) => {
        if (milestone.status === 'completed') summary.completed++;
        else if (milestone.dueDate < today) summary.overdue++;
        else summary.pending++;

        summary.totalPayment += milestone.paymentAmount;
        if (milestone.paid) {
          summary.paidAmount += milestone.paymentAmount;
        } else {
          summary.unpaidAmount += milestone.paymentAmount;
        }
      });

      res.json({
        milestones,
        summary
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
