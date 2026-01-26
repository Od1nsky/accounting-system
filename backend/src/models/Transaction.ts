import pool from '../database/db';

export interface Transaction {
  id: number;
  date?: Date;
  debitAccount?: string;
  creditAccount?: string;
  amount?: number;
  description?: string;
  documentNumber?: string;
  documentType?: string;
  posted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTransaction {
  date?: Date;
  debitAccount?: string;
  creditAccount?: string;
  amount?: number;
  description?: string;
  documentNumber?: string;
  documentType?: string;
  posted?: boolean;
}

export interface UpdateTransaction {
  date?: Date;
  debitAccount?: string;
  creditAccount?: string;
  amount?: number;
  description?: string;
  documentNumber?: string;
  documentType?: string;
  posted?: boolean;
}

export class TransactionModel {
  static async findAll(): Promise<Transaction[]> {
    const result = await pool.query('SELECT id, date, debitAccount, creditAccount, amount, description, documentNumber, documentType, posted, created_at as createdAt, updated_at as updatedAt FROM transactions');
    return result.rows;
  }

  static async findById(id: number): Promise<Transaction | undefined> {
    const result = await pool.query('SELECT id, date, debitAccount, creditAccount, amount, description, documentNumber, documentType, posted, created_at as createdAt, updated_at as updatedAt FROM transactions WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateTransaction): Promise<Transaction> {
    const result = await pool.query(
      'INSERT INTO transactions (date, debitAccount, creditAccount, amount, description, documentNumber, documentType, posted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [data.date, data.debitAccount, data.creditAccount, data.amount, data.description, data.documentNumber, data.documentType, data.posted]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateTransaction): Promise<Transaction | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.date !== undefined) {
      fields.push(`date = $${paramCount++}`);
      values.push(data.date);
    }
    if (data.debitAccount !== undefined) {
      fields.push(`debitAccount = $${paramCount++}`);
      values.push(data.debitAccount);
    }
    if (data.creditAccount !== undefined) {
      fields.push(`creditAccount = $${paramCount++}`);
      values.push(data.creditAccount);
    }
    if (data.amount !== undefined) {
      fields.push(`amount = $${paramCount++}`);
      values.push(data.amount);
    }
    if (data.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(data.description);
    }
    if (data.documentNumber !== undefined) {
      fields.push(`documentNumber = $${paramCount++}`);
      values.push(data.documentNumber);
    }
    if (data.documentType !== undefined) {
      fields.push(`documentType = $${paramCount++}`);
      values.push(data.documentType);
    }
    if (data.posted !== undefined) {
      fields.push(`posted = $${paramCount++}`);
      values.push(data.posted);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE transactions SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM transactions WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
