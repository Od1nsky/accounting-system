import pool from '../database/db';

export interface Task {
  id: number;
  projectId?: number;
  title?: string;
  description?: string;
  type?: string;
  priority?: string;
  status?: string;
  assignedTo?: number;
  estimatedHours?: number;
  actualHours?: number;
  startDate?: Date;
  dueDate?: Date;
  completedDate?: Date;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTask {
  projectId?: number;
  title?: string;
  description?: string;
  type?: string;
  priority?: string;
  status?: string;
  assignedTo?: number;
  estimatedHours?: number;
  actualHours?: number;
  startDate?: Date;
  dueDate?: Date;
  completedDate?: Date;
}

export interface UpdateTask {
  projectId?: number;
  title?: string;
  description?: string;
  type?: string;
  priority?: string;
  status?: string;
  assignedTo?: number;
  estimatedHours?: number;
  actualHours?: number;
  startDate?: Date;
  dueDate?: Date;
  completedDate?: Date;
}

export class TaskModel {
  static async findAll(): Promise<Task[]> {
    const result = await pool.query('SELECT id, projectId, title, description, type, priority, status, assignedTo, estimatedHours, actualHours, startDate, dueDate, completedDate, created_at as createdAt, updated_at as updatedAt FROM tasks');
    return result.rows;
  }

  static async findById(id: number): Promise<Task | undefined> {
    const result = await pool.query('SELECT id, projectId, title, description, type, priority, status, assignedTo, estimatedHours, actualHours, startDate, dueDate, completedDate, created_at as createdAt, updated_at as updatedAt FROM tasks WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateTask): Promise<Task> {
    const result = await pool.query(
      'INSERT INTO tasks (projectId, title, description, type, priority, status, assignedTo, estimatedHours, actualHours, startDate, dueDate, completedDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [data.projectId, data.title, data.description, data.type, data.priority, data.status, data.assignedTo, data.estimatedHours, data.actualHours, data.startDate, data.dueDate, data.completedDate]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateTask): Promise<Task | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.projectId !== undefined) {
      fields.push(`projectId = $${paramCount++}`);
      values.push(data.projectId);
    }
    if (data.title !== undefined) {
      fields.push(`title = $${paramCount++}`);
      values.push(data.title);
    }
    if (data.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(data.description);
    }
    if (data.type !== undefined) {
      fields.push(`type = $${paramCount++}`);
      values.push(data.type);
    }
    if (data.priority !== undefined) {
      fields.push(`priority = $${paramCount++}`);
      values.push(data.priority);
    }
    if (data.status !== undefined) {
      fields.push(`status = $${paramCount++}`);
      values.push(data.status);
    }
    if (data.assignedTo !== undefined) {
      fields.push(`assignedTo = $${paramCount++}`);
      values.push(data.assignedTo);
    }
    if (data.estimatedHours !== undefined) {
      fields.push(`estimatedHours = $${paramCount++}`);
      values.push(data.estimatedHours);
    }
    if (data.actualHours !== undefined) {
      fields.push(`actualHours = $${paramCount++}`);
      values.push(data.actualHours);
    }
    if (data.startDate !== undefined) {
      fields.push(`startDate = $${paramCount++}`);
      values.push(data.startDate);
    }
    if (data.dueDate !== undefined) {
      fields.push(`dueDate = $${paramCount++}`);
      values.push(data.dueDate);
    }
    if (data.completedDate !== undefined) {
      fields.push(`completedDate = $${paramCount++}`);
      values.push(data.completedDate);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE tasks SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
