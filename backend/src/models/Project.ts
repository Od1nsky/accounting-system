import pool from '../database/db';

export interface Project {
  id: number;
  name?: string;
  clientId?: number;
  code?: string;
  type?: string;
  status?: string;
  startDate?: Date;
  endDate?: Date;
  budget?: number;
  actualCost?: number;
  hourlyRate?: number;
  description?: string;
  repository?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProject {
  name?: string;
  clientId?: number;
  code?: string;
  type?: string;
  status?: string;
  startDate?: Date;
  endDate?: Date;
  budget?: number;
  actualCost?: number;
  hourlyRate?: number;
  description?: string;
  repository?: string;
  isActive?: boolean;
}

export interface UpdateProject {
  name?: string;
  clientId?: number;
  code?: string;
  type?: string;
  status?: string;
  startDate?: Date;
  endDate?: Date;
  budget?: number;
  actualCost?: number;
  hourlyRate?: number;
  description?: string;
  repository?: string;
  isActive?: boolean;
}

export class ProjectModel {
  static async findAll(): Promise<Project[]> {
    const result = await pool.query('SELECT id, name, clientId, code, type, status, startDate, endDate, budget, actualCost, hourlyRate, description, repository, isActive, created_at as createdAt, updated_at as updatedAt FROM projects');
    return result.rows;
  }

  static async findById(id: number): Promise<Project | undefined> {
    const result = await pool.query('SELECT id, name, clientId, code, type, status, startDate, endDate, budget, actualCost, hourlyRate, description, repository, isActive, created_at as createdAt, updated_at as updatedAt FROM projects WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateProject): Promise<Project> {
    const result = await pool.query(
      'INSERT INTO projects (name, clientId, code, type, status, startDate, endDate, budget, actualCost, hourlyRate, description, repository, isActive) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
      [data.name, data.clientId, data.code, data.type, data.status, data.startDate, data.endDate, data.budget, data.actualCost, data.hourlyRate, data.description, data.repository, data.isActive]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateProject): Promise<Project | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.name !== undefined) {
      fields.push(`name = $${paramCount++}`);
      values.push(data.name);
    }
    if (data.clientId !== undefined) {
      fields.push(`clientId = $${paramCount++}`);
      values.push(data.clientId);
    }
    if (data.code !== undefined) {
      fields.push(`code = $${paramCount++}`);
      values.push(data.code);
    }
    if (data.type !== undefined) {
      fields.push(`type = $${paramCount++}`);
      values.push(data.type);
    }
    if (data.status !== undefined) {
      fields.push(`status = $${paramCount++}`);
      values.push(data.status);
    }
    if (data.startDate !== undefined) {
      fields.push(`startDate = $${paramCount++}`);
      values.push(data.startDate);
    }
    if (data.endDate !== undefined) {
      fields.push(`endDate = $${paramCount++}`);
      values.push(data.endDate);
    }
    if (data.budget !== undefined) {
      fields.push(`budget = $${paramCount++}`);
      values.push(data.budget);
    }
    if (data.actualCost !== undefined) {
      fields.push(`actualCost = $${paramCount++}`);
      values.push(data.actualCost);
    }
    if (data.hourlyRate !== undefined) {
      fields.push(`hourlyRate = $${paramCount++}`);
      values.push(data.hourlyRate);
    }
    if (data.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(data.description);
    }
    if (data.repository !== undefined) {
      fields.push(`repository = $${paramCount++}`);
      values.push(data.repository);
    }
    if (data.isActive !== undefined) {
      fields.push(`isActive = $${paramCount++}`);
      values.push(data.isActive);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE projects SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM projects WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
