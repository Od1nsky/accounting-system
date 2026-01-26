import pool from '../database/db';

export interface Budget {
  id: number;
  period?: string;
  category?: string;
  type?: string;
  plannedAmount?: number;
  actualAmount?: number;
  variance?: number;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBudget {
  period?: string;
  category?: string;
  type?: string;
  plannedAmount?: number;
  actualAmount?: number;
  variance?: number;
  notes?: string;
}

export interface UpdateBudget {
  period?: string;
  category?: string;
  type?: string;
  plannedAmount?: number;
  actualAmount?: number;
  variance?: number;
  notes?: string;
}

export class BudgetModel {
  static async findAll(): Promise<Budget[]> {
    const result = await pool.query('SELECT id, period, category, type, plannedAmount, actualAmount, variance, notes, created_at as createdAt, updated_at as updatedAt FROM budgets');
    return result.rows;
  }

  static async findById(id: number): Promise<Budget | undefined> {
    const result = await pool.query('SELECT id, period, category, type, plannedAmount, actualAmount, variance, notes, created_at as createdAt, updated_at as updatedAt FROM budgets WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateBudget): Promise<Budget> {
    const result = await pool.query(
      'INSERT INTO budgets (period, category, type, plannedAmount, actualAmount, variance, notes) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [data.period, data.category, data.type, data.plannedAmount, data.actualAmount, data.variance, data.notes]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateBudget): Promise<Budget | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.period !== undefined) {
      fields.push(`period = $${paramCount++}`);
      values.push(data.period);
    }
    if (data.category !== undefined) {
      fields.push(`category = $${paramCount++}`);
      values.push(data.category);
    }
    if (data.type !== undefined) {
      fields.push(`type = $${paramCount++}`);
      values.push(data.type);
    }
    if (data.plannedAmount !== undefined) {
      fields.push(`plannedAmount = $${paramCount++}`);
      values.push(data.plannedAmount);
    }
    if (data.actualAmount !== undefined) {
      fields.push(`actualAmount = $${paramCount++}`);
      values.push(data.actualAmount);
    }
    if (data.variance !== undefined) {
      fields.push(`variance = $${paramCount++}`);
      values.push(data.variance);
    }
    if (data.notes !== undefined) {
      fields.push(`notes = $${paramCount++}`);
      values.push(data.notes);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE budgets SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM budgets WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
