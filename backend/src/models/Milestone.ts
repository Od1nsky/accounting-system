import pool from '../database/db';

export interface Milestone {
  id: number;
  projectId?: number;
  name?: string;
  description?: string;
  dueDate?: Date;
  completedDate?: Date;
  status?: string;
  paymentAmount?: number;
  paid?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateMilestone {
  projectId?: number;
  name?: string;
  description?: string;
  dueDate?: Date;
  completedDate?: Date;
  status?: string;
  paymentAmount?: number;
  paid?: boolean;
}

export interface UpdateMilestone {
  projectId?: number;
  name?: string;
  description?: string;
  dueDate?: Date;
  completedDate?: Date;
  status?: string;
  paymentAmount?: number;
  paid?: boolean;
}

export class MilestoneModel {
  static async findAll(): Promise<Milestone[]> {
    const result = await pool.query('SELECT id, projectId, name, description, dueDate, completedDate, status, paymentAmount, paid, created_at as createdAt, updated_at as updatedAt FROM milestones');
    return result.rows;
  }

  static async findById(id: number): Promise<Milestone | undefined> {
    const result = await pool.query('SELECT id, projectId, name, description, dueDate, completedDate, status, paymentAmount, paid, created_at as createdAt, updated_at as updatedAt FROM milestones WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateMilestone): Promise<Milestone> {
    const result = await pool.query(
      'INSERT INTO milestones (projectId, name, description, dueDate, completedDate, status, paymentAmount, paid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [data.projectId, data.name, data.description, data.dueDate, data.completedDate, data.status, data.paymentAmount, data.paid]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateMilestone): Promise<Milestone | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.projectId !== undefined) {
      fields.push(`projectId = $${paramCount++}`);
      values.push(data.projectId);
    }
    if (data.name !== undefined) {
      fields.push(`name = $${paramCount++}`);
      values.push(data.name);
    }
    if (data.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(data.description);
    }
    if (data.dueDate !== undefined) {
      fields.push(`dueDate = $${paramCount++}`);
      values.push(data.dueDate);
    }
    if (data.completedDate !== undefined) {
      fields.push(`completedDate = $${paramCount++}`);
      values.push(data.completedDate);
    }
    if (data.status !== undefined) {
      fields.push(`status = $${paramCount++}`);
      values.push(data.status);
    }
    if (data.paymentAmount !== undefined) {
      fields.push(`paymentAmount = $${paramCount++}`);
      values.push(data.paymentAmount);
    }
    if (data.paid !== undefined) {
      fields.push(`paid = $${paramCount++}`);
      values.push(data.paid);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE milestones SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM milestones WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
