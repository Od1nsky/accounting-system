import pool from '../database/db';

export interface TaxRecord {
  id: number;
  period?: string;
  taxType?: string;
  taxBase?: number;
  taxRate?: number;
  taxAmount?: number;
  status?: string;
  filingDate?: Date;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTaxRecord {
  period?: string;
  taxType?: string;
  taxBase?: number;
  taxRate?: number;
  taxAmount?: number;
  status?: string;
  filingDate?: Date;
  notes?: string;
}

export interface UpdateTaxRecord {
  period?: string;
  taxType?: string;
  taxBase?: number;
  taxRate?: number;
  taxAmount?: number;
  status?: string;
  filingDate?: Date;
  notes?: string;
}

export class TaxRecordModel {
  static async findAll(): Promise<TaxRecord[]> {
    const result = await pool.query('SELECT id, period, taxType, taxBase, taxRate, taxAmount, status, filingDate, notes, created_at as createdAt, updated_at as updatedAt FROM taxrecords');
    return result.rows;
  }

  static async findById(id: number): Promise<TaxRecord | undefined> {
    const result = await pool.query('SELECT id, period, taxType, taxBase, taxRate, taxAmount, status, filingDate, notes, created_at as createdAt, updated_at as updatedAt FROM taxrecords WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateTaxRecord): Promise<TaxRecord> {
    const result = await pool.query(
      'INSERT INTO taxrecords (period, taxType, taxBase, taxRate, taxAmount, status, filingDate, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [data.period, data.taxType, data.taxBase, data.taxRate, data.taxAmount, data.status, data.filingDate, data.notes]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateTaxRecord): Promise<TaxRecord | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.period !== undefined) {
      fields.push(`period = $${paramCount++}`);
      values.push(data.period);
    }
    if (data.taxType !== undefined) {
      fields.push(`taxType = $${paramCount++}`);
      values.push(data.taxType);
    }
    if (data.taxBase !== undefined) {
      fields.push(`taxBase = $${paramCount++}`);
      values.push(data.taxBase);
    }
    if (data.taxRate !== undefined) {
      fields.push(`taxRate = $${paramCount++}`);
      values.push(data.taxRate);
    }
    if (data.taxAmount !== undefined) {
      fields.push(`taxAmount = $${paramCount++}`);
      values.push(data.taxAmount);
    }
    if (data.status !== undefined) {
      fields.push(`status = $${paramCount++}`);
      values.push(data.status);
    }
    if (data.filingDate !== undefined) {
      fields.push(`filingDate = $${paramCount++}`);
      values.push(data.filingDate);
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
      `UPDATE taxrecords SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM taxrecords WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
