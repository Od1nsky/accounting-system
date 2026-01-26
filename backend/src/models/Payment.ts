import pool from '../database/db';

export interface Payment {
  id: number;
  number?: string;
  invoiceId?: number;
  counterpartyId?: number;
  date?: Date;
  type?: string;
  method?: string;
  amount?: number;
  currency?: string;
  description?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePayment {
  number?: string;
  invoiceId?: number;
  counterpartyId?: number;
  date?: Date;
  type?: string;
  method?: string;
  amount?: number;
  currency?: string;
  description?: string;
  status?: string;
}

export interface UpdatePayment {
  number?: string;
  invoiceId?: number;
  counterpartyId?: number;
  date?: Date;
  type?: string;
  method?: string;
  amount?: number;
  currency?: string;
  description?: string;
  status?: string;
}

export class PaymentModel {
  static async findAll(): Promise<Payment[]> {
    const result = await pool.query('SELECT id, number, invoiceId, counterpartyId, date, type, method, amount, currency, description, status, created_at as createdAt, updated_at as updatedAt FROM payments');
    return result.rows;
  }

  static async findById(id: number): Promise<Payment | undefined> {
    const result = await pool.query('SELECT id, number, invoiceId, counterpartyId, date, type, method, amount, currency, description, status, created_at as createdAt, updated_at as updatedAt FROM payments WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreatePayment): Promise<Payment> {
    const result = await pool.query(
      'INSERT INTO payments (number, invoiceId, counterpartyId, date, type, method, amount, currency, description, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [data.number, data.invoiceId, data.counterpartyId, data.date, data.type, data.method, data.amount, data.currency, data.description, data.status]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdatePayment): Promise<Payment | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.number !== undefined) {
      fields.push(`number = $${paramCount++}`);
      values.push(data.number);
    }
    if (data.invoiceId !== undefined) {
      fields.push(`invoiceId = $${paramCount++}`);
      values.push(data.invoiceId);
    }
    if (data.counterpartyId !== undefined) {
      fields.push(`counterpartyId = $${paramCount++}`);
      values.push(data.counterpartyId);
    }
    if (data.date !== undefined) {
      fields.push(`date = $${paramCount++}`);
      values.push(data.date);
    }
    if (data.type !== undefined) {
      fields.push(`type = $${paramCount++}`);
      values.push(data.type);
    }
    if (data.method !== undefined) {
      fields.push(`method = $${paramCount++}`);
      values.push(data.method);
    }
    if (data.amount !== undefined) {
      fields.push(`amount = $${paramCount++}`);
      values.push(data.amount);
    }
    if (data.currency !== undefined) {
      fields.push(`currency = $${paramCount++}`);
      values.push(data.currency);
    }
    if (data.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(data.description);
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
      `UPDATE payments SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM payments WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
