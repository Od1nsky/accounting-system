import pool from '../database/db';

export interface BankOperation {
  id: number;
  date?: Date;
  type?: string;
  amount?: number;
  currency?: string;
  purpose?: string;
  counterpartyId?: number;
  accountNumber?: string;
  documentNumber?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBankOperation {
  date?: Date;
  type?: string;
  amount?: number;
  currency?: string;
  purpose?: string;
  counterpartyId?: number;
  accountNumber?: string;
  documentNumber?: string;
  status?: string;
}

export interface UpdateBankOperation {
  date?: Date;
  type?: string;
  amount?: number;
  currency?: string;
  purpose?: string;
  counterpartyId?: number;
  accountNumber?: string;
  documentNumber?: string;
  status?: string;
}

export class BankOperationModel {
  static async findAll(): Promise<BankOperation[]> {
    const result = await pool.query('SELECT id, date, type, amount, currency, purpose, counterpartyId, accountNumber, documentNumber, status, created_at as createdAt, updated_at as updatedAt FROM bankoperations');
    return result.rows;
  }

  static async findById(id: number): Promise<BankOperation | undefined> {
    const result = await pool.query('SELECT id, date, type, amount, currency, purpose, counterpartyId, accountNumber, documentNumber, status, created_at as createdAt, updated_at as updatedAt FROM bankoperations WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateBankOperation): Promise<BankOperation> {
    const result = await pool.query(
      'INSERT INTO bankoperations (date, type, amount, currency, purpose, counterpartyId, accountNumber, documentNumber, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [data.date, data.type, data.amount, data.currency, data.purpose, data.counterpartyId, data.accountNumber, data.documentNumber, data.status]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateBankOperation): Promise<BankOperation | undefined> {
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
    if (data.accountNumber !== undefined) {
      fields.push(`accountNumber = $${paramCount++}`);
      values.push(data.accountNumber);
    }
    if (data.documentNumber !== undefined) {
      fields.push(`documentNumber = $${paramCount++}`);
      values.push(data.documentNumber);
    }
    if (data.status !== undefined) {
      fields.push(`status = $${paramCount++}`);
      values.push(data.status);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE bankoperations SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM bankoperations WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
