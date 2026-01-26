import pool from '../database/db';

export interface SalaryPayment {
  id: number;
  employeeId?: number;
  period?: string;
  baseSalary?: number;
  bonus?: number;
  deduction?: number;
  totalAmount?: number;
  paymentDate?: Date;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSalaryPayment {
  employeeId?: number;
  period?: string;
  baseSalary?: number;
  bonus?: number;
  deduction?: number;
  totalAmount?: number;
  paymentDate?: Date;
  status?: string;
}

export interface UpdateSalaryPayment {
  employeeId?: number;
  period?: string;
  baseSalary?: number;
  bonus?: number;
  deduction?: number;
  totalAmount?: number;
  paymentDate?: Date;
  status?: string;
}

export class SalaryPaymentModel {
  static async findAll(): Promise<SalaryPayment[]> {
    const result = await pool.query('SELECT id, employeeId, period, baseSalary, bonus, deduction, totalAmount, paymentDate, status, created_at as createdAt, updated_at as updatedAt FROM salarypayments');
    return result.rows;
  }

  static async findById(id: number): Promise<SalaryPayment | undefined> {
    const result = await pool.query('SELECT id, employeeId, period, baseSalary, bonus, deduction, totalAmount, paymentDate, status, created_at as createdAt, updated_at as updatedAt FROM salarypayments WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateSalaryPayment): Promise<SalaryPayment> {
    const result = await pool.query(
      'INSERT INTO salarypayments (employeeId, period, baseSalary, bonus, deduction, totalAmount, paymentDate, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [data.employeeId, data.period, data.baseSalary, data.bonus, data.deduction, data.totalAmount, data.paymentDate, data.status]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateSalaryPayment): Promise<SalaryPayment | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.employeeId !== undefined) {
      fields.push(`employeeId = $${paramCount++}`);
      values.push(data.employeeId);
    }
    if (data.period !== undefined) {
      fields.push(`period = $${paramCount++}`);
      values.push(data.period);
    }
    if (data.baseSalary !== undefined) {
      fields.push(`baseSalary = $${paramCount++}`);
      values.push(data.baseSalary);
    }
    if (data.bonus !== undefined) {
      fields.push(`bonus = $${paramCount++}`);
      values.push(data.bonus);
    }
    if (data.deduction !== undefined) {
      fields.push(`deduction = $${paramCount++}`);
      values.push(data.deduction);
    }
    if (data.totalAmount !== undefined) {
      fields.push(`totalAmount = $${paramCount++}`);
      values.push(data.totalAmount);
    }
    if (data.paymentDate !== undefined) {
      fields.push(`paymentDate = $${paramCount++}`);
      values.push(data.paymentDate);
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
      `UPDATE salarypayments SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM salarypayments WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
