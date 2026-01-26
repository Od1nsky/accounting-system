import pool from '../database/db';

export interface Inventory {
  id: number;
  date?: Date;
  warehouse?: string;
  status?: string;
  responsiblePersonId?: number;
  notes?: string;
  completedDate?: Date;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateInventory {
  date?: Date;
  warehouse?: string;
  status?: string;
  responsiblePersonId?: number;
  notes?: string;
  completedDate?: Date;
}

export interface UpdateInventory {
  date?: Date;
  warehouse?: string;
  status?: string;
  responsiblePersonId?: number;
  notes?: string;
  completedDate?: Date;
}

export class InventoryModel {
  static async findAll(): Promise<Inventory[]> {
    const result = await pool.query('SELECT id, date, warehouse, status, responsiblePersonId, notes, completedDate, created_at as createdAt, updated_at as updatedAt FROM inventorys');
    return result.rows;
  }

  static async findById(id: number): Promise<Inventory | undefined> {
    const result = await pool.query('SELECT id, date, warehouse, status, responsiblePersonId, notes, completedDate, created_at as createdAt, updated_at as updatedAt FROM inventorys WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateInventory): Promise<Inventory> {
    const result = await pool.query(
      'INSERT INTO inventorys (date, warehouse, status, responsiblePersonId, notes, completedDate) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [data.date, data.warehouse, data.status, data.responsiblePersonId, data.notes, data.completedDate]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateInventory): Promise<Inventory | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.date !== undefined) {
      fields.push(`date = $${paramCount++}`);
      values.push(data.date);
    }
    if (data.warehouse !== undefined) {
      fields.push(`warehouse = $${paramCount++}`);
      values.push(data.warehouse);
    }
    if (data.status !== undefined) {
      fields.push(`status = $${paramCount++}`);
      values.push(data.status);
    }
    if (data.responsiblePersonId !== undefined) {
      fields.push(`responsiblePersonId = $${paramCount++}`);
      values.push(data.responsiblePersonId);
    }
    if (data.notes !== undefined) {
      fields.push(`notes = $${paramCount++}`);
      values.push(data.notes);
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
      `UPDATE inventorys SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM inventorys WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
