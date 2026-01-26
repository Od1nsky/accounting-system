import pool from '../database/db';

export interface Invoice {
  id: number;
  number?: string;
  counterpartyId?: number;
  contractId?: number;
  date?: Date;
  dueDate?: Date;
  totalAmount?: number;
  vatAmount?: number;
  status?: string;
  paid?: boolean;
  paidDate?: Date;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateInvoice {
  number?: string;
  counterpartyId?: number;
  contractId?: number;
  date?: Date;
  dueDate?: Date;
  totalAmount?: number;
  vatAmount?: number;
  status?: string;
  paid?: boolean;
  paidDate?: Date;
}

export interface UpdateInvoice {
  number?: string;
  counterpartyId?: number;
  contractId?: number;
  date?: Date;
  dueDate?: Date;
  totalAmount?: number;
  vatAmount?: number;
  status?: string;
  paid?: boolean;
  paidDate?: Date;
}

export class InvoiceModel {
  static async findAll(): Promise<Invoice[]> {
    const result = await pool.query('SELECT id, number, counterpartyId, contractId, date, dueDate, totalAmount, vatAmount, status, paid, paidDate, created_at as createdAt, updated_at as updatedAt FROM invoices');
    return result.rows;
  }

  static async findById(id: number): Promise<Invoice | undefined> {
    const result = await pool.query('SELECT id, number, counterpartyId, contractId, date, dueDate, totalAmount, vatAmount, status, paid, paidDate, created_at as createdAt, updated_at as updatedAt FROM invoices WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateInvoice): Promise<Invoice> {
    const result = await pool.query(
      'INSERT INTO invoices (number, counterpartyId, contractId, date, dueDate, totalAmount, vatAmount, status, paid, paidDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [data.number, data.counterpartyId, data.contractId, data.date, data.dueDate, data.totalAmount, data.vatAmount, data.status, data.paid, data.paidDate]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateInvoice): Promise<Invoice | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.number !== undefined) {
      fields.push(`number = $${paramCount++}`);
      values.push(data.number);
    }
    if (data.counterpartyId !== undefined) {
      fields.push(`counterpartyId = $${paramCount++}`);
      values.push(data.counterpartyId);
    }
    if (data.contractId !== undefined) {
      fields.push(`contractId = $${paramCount++}`);
      values.push(data.contractId);
    }
    if (data.date !== undefined) {
      fields.push(`date = $${paramCount++}`);
      values.push(data.date);
    }
    if (data.dueDate !== undefined) {
      fields.push(`dueDate = $${paramCount++}`);
      values.push(data.dueDate);
    }
    if (data.totalAmount !== undefined) {
      fields.push(`totalAmount = $${paramCount++}`);
      values.push(data.totalAmount);
    }
    if (data.vatAmount !== undefined) {
      fields.push(`vatAmount = $${paramCount++}`);
      values.push(data.vatAmount);
    }
    if (data.status !== undefined) {
      fields.push(`status = $${paramCount++}`);
      values.push(data.status);
    }
    if (data.paid !== undefined) {
      fields.push(`paid = $${paramCount++}`);
      values.push(data.paid);
    }
    if (data.paidDate !== undefined) {
      fields.push(`paidDate = $${paramCount++}`);
      values.push(data.paidDate);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE invoices SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM invoices WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
