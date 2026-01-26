import pool from '../database/db';

export interface ProjectExpense {
  id: number;
  projectId?: number;
  date?: Date;
  category?: string;
  amount?: number;
  description?: string;
  receipt?: string;
  approved?: boolean;
  reimbursable?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProjectExpense {
  projectId?: number;
  date?: Date;
  category?: string;
  amount?: number;
  description?: string;
  receipt?: string;
  approved?: boolean;
  reimbursable?: boolean;
}

export interface UpdateProjectExpense {
  projectId?: number;
  date?: Date;
  category?: string;
  amount?: number;
  description?: string;
  receipt?: string;
  approved?: boolean;
  reimbursable?: boolean;
}

export class ProjectExpenseModel {
  static async findAll(): Promise<ProjectExpense[]> {
    const result = await pool.query('SELECT id, projectId, date, category, amount, description, receipt, approved, reimbursable, created_at as createdAt, updated_at as updatedAt FROM projectexpenses');
    return result.rows;
  }

  static async findById(id: number): Promise<ProjectExpense | undefined> {
    const result = await pool.query('SELECT id, projectId, date, category, amount, description, receipt, approved, reimbursable, created_at as createdAt, updated_at as updatedAt FROM projectexpenses WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateProjectExpense): Promise<ProjectExpense> {
    const result = await pool.query(
      'INSERT INTO projectexpenses (projectId, date, category, amount, description, receipt, approved, reimbursable) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [data.projectId, data.date, data.category, data.amount, data.description, data.receipt, data.approved, data.reimbursable]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateProjectExpense): Promise<ProjectExpense | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.projectId !== undefined) {
      fields.push(`projectId = $${paramCount++}`);
      values.push(data.projectId);
    }
    if (data.date !== undefined) {
      fields.push(`date = $${paramCount++}`);
      values.push(data.date);
    }
    if (data.category !== undefined) {
      fields.push(`category = $${paramCount++}`);
      values.push(data.category);
    }
    if (data.amount !== undefined) {
      fields.push(`amount = $${paramCount++}`);
      values.push(data.amount);
    }
    if (data.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(data.description);
    }
    if (data.receipt !== undefined) {
      fields.push(`receipt = $${paramCount++}`);
      values.push(data.receipt);
    }
    if (data.approved !== undefined) {
      fields.push(`approved = $${paramCount++}`);
      values.push(data.approved);
    }
    if (data.reimbursable !== undefined) {
      fields.push(`reimbursable = $${paramCount++}`);
      values.push(data.reimbursable);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE projectexpenses SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM projectexpenses WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
