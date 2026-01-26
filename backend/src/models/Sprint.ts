import pool from '../database/db';

export interface Sprint {
  id: number;
  projectId?: number;
  name?: string;
  goal?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  velocity?: number;
  capacity?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSprint {
  projectId?: number;
  name?: string;
  goal?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  velocity?: number;
  capacity?: number;
}

export interface UpdateSprint {
  projectId?: number;
  name?: string;
  goal?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  velocity?: number;
  capacity?: number;
}

export class SprintModel {
  static async findAll(): Promise<Sprint[]> {
    const result = await pool.query('SELECT id, projectId, name, goal, startDate, endDate, status, velocity, capacity, created_at as createdAt, updated_at as updatedAt FROM sprints');
    return result.rows;
  }

  static async findById(id: number): Promise<Sprint | undefined> {
    const result = await pool.query('SELECT id, projectId, name, goal, startDate, endDate, status, velocity, capacity, created_at as createdAt, updated_at as updatedAt FROM sprints WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateSprint): Promise<Sprint> {
    const result = await pool.query(
      'INSERT INTO sprints (projectId, name, goal, startDate, endDate, status, velocity, capacity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [data.projectId, data.name, data.goal, data.startDate, data.endDate, data.status, data.velocity, data.capacity]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateSprint): Promise<Sprint | undefined> {
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
    if (data.goal !== undefined) {
      fields.push(`goal = $${paramCount++}`);
      values.push(data.goal);
    }
    if (data.startDate !== undefined) {
      fields.push(`startDate = $${paramCount++}`);
      values.push(data.startDate);
    }
    if (data.endDate !== undefined) {
      fields.push(`endDate = $${paramCount++}`);
      values.push(data.endDate);
    }
    if (data.status !== undefined) {
      fields.push(`status = $${paramCount++}`);
      values.push(data.status);
    }
    if (data.velocity !== undefined) {
      fields.push(`velocity = $${paramCount++}`);
      values.push(data.velocity);
    }
    if (data.capacity !== undefined) {
      fields.push(`capacity = $${paramCount++}`);
      values.push(data.capacity);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE sprints SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM sprints WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
