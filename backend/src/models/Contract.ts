import pool from '../database/db';

export interface Contract {
  id: number;
  number?: string;
  counterpartyId?: number;
  type?: string;
  signDate?: Date;
  startDate?: Date;
  endDate?: Date;
  amount?: number;
  status?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateContract {
  number?: string;
  counterpartyId?: number;
  type?: string;
  signDate?: Date;
  startDate?: Date;
  endDate?: Date;
  amount?: number;
  status?: string;
  description?: string;
}

export interface UpdateContract {
  number?: string;
  counterpartyId?: number;
  type?: string;
  signDate?: Date;
  startDate?: Date;
  endDate?: Date;
  amount?: number;
  status?: string;
  description?: string;
}

export class ContractModel {
  static async findAll(): Promise<Contract[]> {
    const result = await pool.query('SELECT id, number, counterpartyId, type, signDate, startDate, endDate, amount, status, description, created_at as createdAt, updated_at as updatedAt FROM contracts');
    return result.rows;
  }

  static async findById(id: number): Promise<Contract | undefined> {
    const result = await pool.query('SELECT id, number, counterpartyId, type, signDate, startDate, endDate, amount, status, description, created_at as createdAt, updated_at as updatedAt FROM contracts WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateContract): Promise<Contract> {
    const result = await pool.query(
      'INSERT INTO contracts (number, counterpartyId, type, signDate, startDate, endDate, amount, status, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [data.number, data.counterpartyId, data.type, data.signDate, data.startDate, data.endDate, data.amount, data.status, data.description]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateContract): Promise<Contract | undefined> {
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
    if (data.type !== undefined) {
      fields.push(`type = $${paramCount++}`);
      values.push(data.type);
    }
    if (data.signDate !== undefined) {
      fields.push(`signDate = $${paramCount++}`);
      values.push(data.signDate);
    }
    if (data.startDate !== undefined) {
      fields.push(`startDate = $${paramCount++}`);
      values.push(data.startDate);
    }
    if (data.endDate !== undefined) {
      fields.push(`endDate = $${paramCount++}`);
      values.push(data.endDate);
    }
    if (data.amount !== undefined) {
      fields.push(`amount = $${paramCount++}`);
      values.push(data.amount);
    }
    if (data.status !== undefined) {
      fields.push(`status = $${paramCount++}`);
      values.push(data.status);
    }
    if (data.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(data.description);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE contracts SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM contracts WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
