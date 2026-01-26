import pool from '../database/db';

export interface TimeEntry {
  id: number;
  employeeId?: number;
  projectId?: number;
  taskId?: number;
  date?: Date;
  hours?: number;
  description?: string;
  billable?: boolean;
  hourlyRate?: number;
  approved?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTimeEntry {
  employeeId?: number;
  projectId?: number;
  taskId?: number;
  date?: Date;
  hours?: number;
  description?: string;
  billable?: boolean;
  hourlyRate?: number;
  approved?: boolean;
}

export interface UpdateTimeEntry {
  employeeId?: number;
  projectId?: number;
  taskId?: number;
  date?: Date;
  hours?: number;
  description?: string;
  billable?: boolean;
  hourlyRate?: number;
  approved?: boolean;
}

export class TimeEntryModel {
  static async findAll(): Promise<TimeEntry[]> {
    const result = await pool.query('SELECT id, employeeId, projectId, taskId, date, hours, description, billable, hourlyRate, approved, created_at as createdAt, updated_at as updatedAt FROM timeentrys');
    return result.rows;
  }

  static async findById(id: number): Promise<TimeEntry | undefined> {
    const result = await pool.query('SELECT id, employeeId, projectId, taskId, date, hours, description, billable, hourlyRate, approved, created_at as createdAt, updated_at as updatedAt FROM timeentrys WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateTimeEntry): Promise<TimeEntry> {
    const result = await pool.query(
      'INSERT INTO timeentrys (employeeId, projectId, taskId, date, hours, description, billable, hourlyRate, approved) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [data.employeeId, data.projectId, data.taskId, data.date, data.hours, data.description, data.billable, data.hourlyRate, data.approved]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateTimeEntry): Promise<TimeEntry | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.employeeId !== undefined) {
      fields.push(`employeeId = $${paramCount++}`);
      values.push(data.employeeId);
    }
    if (data.projectId !== undefined) {
      fields.push(`projectId = $${paramCount++}`);
      values.push(data.projectId);
    }
    if (data.taskId !== undefined) {
      fields.push(`taskId = $${paramCount++}`);
      values.push(data.taskId);
    }
    if (data.date !== undefined) {
      fields.push(`date = $${paramCount++}`);
      values.push(data.date);
    }
    if (data.hours !== undefined) {
      fields.push(`hours = $${paramCount++}`);
      values.push(data.hours);
    }
    if (data.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(data.description);
    }
    if (data.billable !== undefined) {
      fields.push(`billable = $${paramCount++}`);
      values.push(data.billable);
    }
    if (data.hourlyRate !== undefined) {
      fields.push(`hourlyRate = $${paramCount++}`);
      values.push(data.hourlyRate);
    }
    if (data.approved !== undefined) {
      fields.push(`approved = $${paramCount++}`);
      values.push(data.approved);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE timeentrys SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM timeentrys WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
