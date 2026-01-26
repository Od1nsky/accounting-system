import pool from '../database/db';

export interface CashOperation {
  id: number;
  date?: Date;
  type?: string;
  amount?: number;
  currency?: string;
  purpose?: string;
  counterpartyId?: number;
  employeeId?: number;
  documentNumber?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCashOperation {
  date?: Date;
  type?: string;
  amount?: number;
  currency?: string;
  purpose?: string;
  counterpartyId?: number;
  employeeId?: number;
  documentNumber?: string;
}

export interface UpdateCashOperation {
  date?: Date;
  type?: string;
  amount?: number;
  currency?: string;
  purpose?: string;
  counterpartyId?: number;
  employeeId?: number;
  documentNumber?: string;
}

export class CashOperationModel {
  static async findAll(): Promise<CashOperation[]> {
    const result = await pool.query('SELECT id, date, type, amount, currency, purpose, counterpartyId, employeeId, documentNumber, created_at as createdAt, updated_at as updatedAt FROM cashoperations');
    return result.rows;
  }

  static async findById(id: number): Promise<CashOperation | undefined> {
    const result = await pool.query('SELECT id, date, type, amount, currency, purpose, counterpartyId, employeeId, documentNumber, created_at as createdAt, updated_at as updatedAt FROM cashoperations WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateCashOperation): Promise<CashOperation> {
    const result = await pool.query(
      'INSERT INTO cashoperations (date, type, amount, currency, purpose, counterpartyId, employeeId, documentNumber) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [data.date, data.type, data.amount, data.currency, data.purpose, data.counterpartyId, data.employeeId, data.documentNumber]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateCashOperation): Promise<CashOperation | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.date !== undefined) {
      fields.push(`date = $${paramCount++}`);
      values.push(data.date);
    }
    if (data.type !== undefined) {
      fields.push(`type = $${paramCount++}`);
      values.push(data.type);
    }
    if (data.amount !== undefined) {
      fields.push(`amount = $${paramCount++}`);
      values.push(data.amount);
    }
    if (data.currency !== undefined) {
      fields.push(`currency = $${paramCount++}`);
      values.push(data.currency);
    }
    if (data.purpose !== undefined) {
      fields.push(`purpose = $${paramCount++}`);
      values.push(data.purpose);
    }
    if (data.counterpartyId !== undefined) {
      fields.push(`counterpartyId = $${paramCount++}`);
      values.push(data.counterpartyId);
    }
    if (data.employeeId !== undefined) {
      fields.push(`employeeId = $${paramCount++}`);
      values.push(data.employeeId);
    }
    if (data.documentNumber !== undefined) {
      fields.push(`documentNumber = $${paramCount++}`);
      values.push(data.documentNumber);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE cashoperations SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM cashoperations WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
