import pool from '../database/db';

export interface Reconciliation {
  id: number;
  counterpartyId?: number;
  startDate?: Date;
  endDate?: Date;
  ourBalance?: number;
  theirBalance?: number;
  difference?: number;
  status?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateReconciliation {
  counterpartyId?: number;
  startDate?: Date;
  endDate?: Date;
  ourBalance?: number;
  theirBalance?: number;
  difference?: number;
  status?: string;
  notes?: string;
}

export interface UpdateReconciliation {
  counterpartyId?: number;
  startDate?: Date;
  endDate?: Date;
  ourBalance?: number;
  theirBalance?: number;
  difference?: number;
  status?: string;
  notes?: string;
}

export class ReconciliationModel {
  static async findAll(): Promise<Reconciliation[]> {
    const result = await pool.query('SELECT id, counterpartyId, startDate, endDate, ourBalance, theirBalance, difference, status, notes, created_at as createdAt, updated_at as updatedAt FROM reconciliations');
    return result.rows;
  }

  static async findById(id: number): Promise<Reconciliation | undefined> {
    const result = await pool.query('SELECT id, counterpartyId, startDate, endDate, ourBalance, theirBalance, difference, status, notes, created_at as createdAt, updated_at as updatedAt FROM reconciliations WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateReconciliation): Promise<Reconciliation> {
    const result = await pool.query(
      'INSERT INTO reconciliations (counterpartyId, startDate, endDate, ourBalance, theirBalance, difference, status, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [data.counterpartyId, data.startDate, data.endDate, data.ourBalance, data.theirBalance, data.difference, data.status, data.notes]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateReconciliation): Promise<Reconciliation | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.counterpartyId !== undefined) {
      fields.push(`counterpartyId = $${paramCount++}`);
      values.push(data.counterpartyId);
    }
    if (data.startDate !== undefined) {
      fields.push(`startDate = $${paramCount++}`);
      values.push(data.startDate);
    }
    if (data.endDate !== undefined) {
      fields.push(`endDate = $${paramCount++}`);
      values.push(data.endDate);
    }
    if (data.ourBalance !== undefined) {
      fields.push(`ourBalance = $${paramCount++}`);
      values.push(data.ourBalance);
    }
    if (data.theirBalance !== undefined) {
      fields.push(`theirBalance = $${paramCount++}`);
      values.push(data.theirBalance);
    }
    if (data.difference !== undefined) {
      fields.push(`difference = $${paramCount++}`);
      values.push(data.difference);
    }
    if (data.status !== undefined) {
      fields.push(`status = $${paramCount++}`);
      values.push(data.status);
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
      `UPDATE reconciliations SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM reconciliations WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
