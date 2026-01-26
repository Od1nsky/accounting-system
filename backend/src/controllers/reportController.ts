import { Request, Response } from 'express';
import { db } from '../database/init';

export class ReportController {
  // Balance Sheet Report
  static getBalanceSheet(req: Request, res: Response) {
    try {
      const { date } = req.query;

      // Get all accounts with balances
      const accounts = db.prepare(`
        SELECT a.code, a.name, a.type,
               COALESCE(SUM(CASE WHEN t.debitAccount = a.code THEN t.amount ELSE 0 END), 0) as debit,
               COALESCE(SUM(CASE WHEN t.creditAccount = a.code THEN t.amount ELSE 0 END), 0) as credit
        FROM account a
        LEFT JOIN transaction t ON (t.debitAccount = a.code OR t.creditAccount = a.code)
          AND t.posted = true
          ${date ? 'AND t.date <= ?' : ''}
        GROUP BY a.code, a.name, a.type
        HAVING debit != 0 OR credit != 0
        ORDER BY a.code
      `).all(date ? [date] : []);

      res.json({
        date: date || new Date().toISOString(),
        accounts
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Profit & Loss Report
  static getProfitLoss(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;

      const transactions = db.prepare(`
        SELECT t.*, a1.type as debitType, a2.type as creditType
        FROM transaction t
        JOIN account a1 ON t.debitAccount = a1.code
        JOIN account a2 ON t.creditAccount = a2.code
        WHERE t.posted = true
          ${startDate ? 'AND t.date >= ?' : ''}
          ${endDate ? 'AND t.date <= ?' : ''}
        ORDER BY t.date
      `).all(...[startDate, endDate].filter(Boolean));

      let revenue = 0;
      let expenses = 0;

      transactions.forEach((t: any) => {
        if (t.creditType === 'revenue') revenue += t.amount;
        if (t.debitType === 'expense') expenses += t.amount;
      });

      res.json({
        period: { startDate, endDate },
        revenue,
        expenses,
        profit: revenue - expenses,
        transactions
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Cash Flow Report
  static getCashFlow(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;

      const cashOperations = db.prepare(`
        SELECT date, type, amount, purpose
        FROM cashOperation
        WHERE 1=1
          ${startDate ? 'AND date >= ?' : ''}
          ${endDate ? 'AND date <= ?' : ''}
        ORDER BY date
      `).all(...[startDate, endDate].filter(Boolean));

      const bankOperations = db.prepare(`
        SELECT date, type, amount, purpose
        FROM bankOperation
        WHERE 1=1
          ${startDate ? 'AND date >= ?' : ''}
          ${endDate ? 'AND date <= ?' : ''}
        ORDER BY date
      `).all(...[startDate, endDate].filter(Boolean));

      let cashInflow = 0;
      let cashOutflow = 0;
      let bankInflow = 0;
      let bankOutflow = 0;

      cashOperations.forEach((op: any) => {
        if (op.type === 'income') cashInflow += op.amount;
        else cashOutflow += op.amount;
      });

      bankOperations.forEach((op: any) => {
        if (op.type === 'income') bankInflow += op.amount;
        else bankOutflow += op.amount;
      });

      res.json({
        period: { startDate, endDate },
        cash: {
          inflow: cashInflow,
          outflow: cashOutflow,
          balance: cashInflow - cashOutflow
        },
        bank: {
          inflow: bankInflow,
          outflow: bankOutflow,
          balance: bankInflow - bankOutflow
        },
        total: {
          inflow: cashInflow + bankInflow,
          outflow: cashOutflow + bankOutflow,
          balance: (cashInflow + bankInflow) - (cashOutflow + bankOutflow)
        }
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Accounts Receivable Aging Report
  static getAccountsReceivable(req: Request, res: Response) {
    try {
      const invoices = db.prepare(`
        SELECT i.*, c.name as counterpartyName,
               (julianday('now') - julianday(i.dueDate)) as daysOverdue
        FROM invoice i
        JOIN counterparty c ON i.counterpartyId = c.id
        WHERE i.paid = false
        ORDER BY i.dueDate
      `).all();

      const aging = {
        current: 0,
        days30: 0,
        days60: 0,
        days90: 0,
        over90: 0
      };

      invoices.forEach((inv: any) => {
        const days = inv.daysOverdue;
        if (days < 0) aging.current += inv.totalAmount;
        else if (days <= 30) aging.days30 += inv.totalAmount;
        else if (days <= 60) aging.days60 += inv.totalAmount;
        else if (days <= 90) aging.days90 += inv.totalAmount;
        else aging.over90 += inv.totalAmount;
      });

      res.json({
        invoices,
        aging,
        total: invoices.reduce((sum: number, inv: any) => sum + inv.totalAmount, 0)
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // VAT Report
  static getVATReport(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;

      const invoices = db.prepare(`
        SELECT *, 'sale' as operationType
        FROM invoice
        WHERE 1=1
          ${startDate ? 'AND date >= ?' : ''}
          ${endDate ? 'AND date <= ?' : ''}
        ORDER BY date
      `).all(...[startDate, endDate].filter(Boolean));

      const totalVAT = invoices.reduce((sum: number, inv: any) => sum + (inv.vatAmount || 0), 0);
      const totalAmount = invoices.reduce((sum: number, inv: any) => sum + inv.totalAmount, 0);

      res.json({
        period: { startDate, endDate },
        invoices,
        summary: {
          totalAmount,
          totalVAT,
          amountWithoutVAT: totalAmount - totalVAT
        }
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Inventory Valuation Report
  static getInventoryValuation(req: Request, res: Response) {
    try {
      const inventory = db.prepare(`
        SELECT p.*,
               COALESCE(SUM(CASE WHEN wo.type = 'receipt' THEN wo.quantity ELSE -wo.quantity END), 0) as quantity,
               COALESCE(AVG(wo.price), p.cost) as avgCost
        FROM product p
        LEFT JOIN warehouseOperation wo ON p.id = wo.productId
        WHERE p.isActive = true
        GROUP BY p.id
        HAVING quantity > 0
      `).all();

      const totalValue = inventory.reduce((sum: number, item: any) =>
        sum + (item.quantity * item.avgCost), 0
      );

      res.json({
        inventory,
        totalValue,
        totalItems: inventory.length
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Fixed Assets Report
  static getFixedAssetsReport(req: Request, res: Response) {
    try {
      const assets = db.prepare(`
        SELECT a.*,
               COALESCE(SUM(d.amount), 0) as totalDepreciation,
               (a.cost - COALESCE(SUM(d.amount), 0)) as bookValue
        FROM asset a
        LEFT JOIN depreciation d ON a.id = d.assetId AND d.posted = true
        GROUP BY a.id
        ORDER BY a.category, a.name
      `).all();

      const summary = {
        totalCost: 0,
        totalDepreciation: 0,
        totalBookValue: 0,
        byCategory: {} as any
      };

      assets.forEach((asset: any) => {
        summary.totalCost += asset.cost;
        summary.totalDepreciation += asset.totalDepreciation;
        summary.totalBookValue += asset.bookValue;

        if (!summary.byCategory[asset.category]) {
          summary.byCategory[asset.category] = {
            cost: 0,
            depreciation: 0,
            bookValue: 0,
            count: 0
          };
        }

        summary.byCategory[asset.category].cost += asset.cost;
        summary.byCategory[asset.category].depreciation += asset.totalDepreciation;
        summary.byCategory[asset.category].bookValue += asset.bookValue;
        summary.byCategory[asset.category].count++;
      });

      res.json({
        assets,
        summary
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Payroll Report
  static getPayrollReport(req: Request, res: Response) {
    try {
      const { period } = req.query;

      const payroll = db.prepare(`
        SELECT sp.*, e.firstName, e.lastName, e.position, e.department
        FROM salaryPayment sp
        JOIN employee e ON sp.employeeId = e.id
        ${period ? 'WHERE sp.period = ?' : ''}
        ORDER BY e.department, e.lastName
      `).all(period ? [period] : []);

      const summary = {
        totalBaseSalary: 0,
        totalBonus: 0,
        totalDeduction: 0,
        totalAmount: 0,
        byDepartment: {} as any
      };

      payroll.forEach((payment: any) => {
        summary.totalBaseSalary += payment.baseSalary;
        summary.totalBonus += payment.bonus;
        summary.totalDeduction += payment.deduction;
        summary.totalAmount += payment.totalAmount;

        if (!summary.byDepartment[payment.department]) {
          summary.byDepartment[payment.department] = {
            baseSalary: 0,
            bonus: 0,
            deduction: 0,
            totalAmount: 0,
            employees: 0
          };
        }

        summary.byDepartment[payment.department].baseSalary += payment.baseSalary;
        summary.byDepartment[payment.department].bonus += payment.bonus;
        summary.byDepartment[payment.department].deduction += payment.deduction;
        summary.byDepartment[payment.department].totalAmount += payment.totalAmount;
        summary.byDepartment[payment.department].employees++;
      });

      res.json({
        period: period || 'all',
        payroll,
        summary
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Dashboard Summary
  static getDashboard(req: Request, res: Response) {
    try {
      const today = new Date().toISOString().split('T')[0];
      const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];

      const stats = {
        accounts: db.prepare('SELECT COUNT(*) as count FROM account WHERE isActive = true').get(),
        counterparties: db.prepare('SELECT COUNT(*) as count FROM counterparty WHERE isActive = true').get(),
        unpaidInvoices: db.prepare('SELECT COUNT(*) as count, COALESCE(SUM(totalAmount), 0) as total FROM invoice WHERE paid = false').get(),
        overdueInvoices: db.prepare('SELECT COUNT(*) as count FROM invoice WHERE paid = false AND dueDate < ?').get(today),
        monthlyTransactions: db.prepare('SELECT COUNT(*) as count FROM transaction WHERE date >= ? AND posted = true').get(monthStart),
        employees: db.prepare('SELECT COUNT(*) as count FROM employee WHERE isActive = true').get(),
        products: db.prepare('SELECT COUNT(*) as count FROM product WHERE isActive = true').get(),
        assets: db.prepare('SELECT COUNT(*) as count, COALESCE(SUM(cost), 0) as totalCost FROM asset WHERE status = "in_use"').get()
      };

      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
