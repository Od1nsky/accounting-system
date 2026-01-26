import pool from '../database/db';

export interface Depreciation {
  id: number;
  assetId?: number;
  period?: string;
  amount?: number;
  accumulatedAmount?: number;
  calculationDate?: Date;
  posted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateDepreciation {
  assetId?: number;
  period?: string;
  amount?: number;
  accumulatedAmount?: number;
  calculationDate?: Date;
  posted?: boolean;
}

export interface UpdateDepreciation {
  assetId?: number;
  period?: string;
  amount?: number;
  accumulatedAmount?: number;
  calculationDate?: Date;
  posted?: boolean;
}

export class DepreciationModel {
  static async findAll(): Promise<Depreciation[]> {
    const result = await pool.query('SELECT id, assetId, period, amount, accumulatedAmount, calculationDate, posted, created_at as createdAt, updated_at as updatedAt FROM depreciations');
    return result.rows;
  }

  static async findById(id: number): Promise<Depreciation | undefined> {
    const result = await pool.query('SELECT id, assetId, period, amount, accumulatedAmount, calculationDate, posted, created_at as createdAt, updated_at as updatedAt FROM depreciations WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateDepreciation): Promise<Depreciation> {
    const result = await pool.query(
      'INSERT INTO depreciations (assetId, period, amount, accumulatedAmount, calculationDate, posted) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [data.assetId, data.period, data.amount, data.accumulatedAmount, data.calculationDate, data.posted]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateDepreciation): Promise<Depreciation | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.assetId !== undefined) {
      fields.push(`assetId = $${paramCount++}`);
      values.push(data.assetId);
    }
    if (data.period !== undefined) {
      fields.push(`period = $${paramCount++}`);
      values.push(data.period);
    }
    if (data.amount !== undefined) {
      fields.push(`amount = $${paramCount++}`);
      values.push(data.amount);
    }
    if (data.accumulatedAmount !== undefined) {
      fields.push(`accumulatedAmount = $${paramCount++}`);
      values.push(data.accumulatedAmount);
    }
    if (data.calculationDate !== undefined) {
      fields.push(`calculationDate = $${paramCount++}`);
      values.push(data.calculationDate);
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
      `UPDATE depreciations SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM depreciations WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
