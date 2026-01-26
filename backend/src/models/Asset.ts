import pool from '../database/db';

export interface Asset {
  id: number;
  name?: string;
  inventoryNumber?: string;
  category?: string;
  cost?: number;
  purchaseDate?: Date;
  depreciationRate?: number;
  residualValue?: number;
  status?: string;
  location?: string;
  responsiblePersonId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAsset {
  name?: string;
  inventoryNumber?: string;
  category?: string;
  cost?: number;
  purchaseDate?: Date;
  depreciationRate?: number;
  residualValue?: number;
  status?: string;
  location?: string;
  responsiblePersonId?: number;
}

export interface UpdateAsset {
  name?: string;
  inventoryNumber?: string;
  category?: string;
  cost?: number;
  purchaseDate?: Date;
  depreciationRate?: number;
  residualValue?: number;
  status?: string;
  location?: string;
  responsiblePersonId?: number;
}

export class AssetModel {
  static async findAll(): Promise<Asset[]> {
    const result = await pool.query('SELECT id, name, inventoryNumber, category, cost, purchaseDate, depreciationRate, residualValue, status, location, responsiblePersonId, created_at as createdAt, updated_at as updatedAt FROM assets');
    return result.rows;
  }

  static async findById(id: number): Promise<Asset | undefined> {
    const result = await pool.query('SELECT id, name, inventoryNumber, category, cost, purchaseDate, depreciationRate, residualValue, status, location, responsiblePersonId, created_at as createdAt, updated_at as updatedAt FROM assets WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateAsset): Promise<Asset> {
    const result = await pool.query(
      'INSERT INTO assets (name, inventoryNumber, category, cost, purchaseDate, depreciationRate, residualValue, status, location, responsiblePersonId) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [data.name, data.inventoryNumber, data.category, data.cost, data.purchaseDate, data.depreciationRate, data.residualValue, data.status, data.location, data.responsiblePersonId]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateAsset): Promise<Asset | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.name !== undefined) {
      fields.push(`name = $${paramCount++}`);
      values.push(data.name);
    }
    if (data.inventoryNumber !== undefined) {
      fields.push(`inventoryNumber = $${paramCount++}`);
      values.push(data.inventoryNumber);
    }
    if (data.category !== undefined) {
      fields.push(`category = $${paramCount++}`);
      values.push(data.category);
    }
    if (data.cost !== undefined) {
      fields.push(`cost = $${paramCount++}`);
      values.push(data.cost);
    }
    if (data.purchaseDate !== undefined) {
      fields.push(`purchaseDate = $${paramCount++}`);
      values.push(data.purchaseDate);
    }
    if (data.depreciationRate !== undefined) {
      fields.push(`depreciationRate = $${paramCount++}`);
      values.push(data.depreciationRate);
    }
    if (data.residualValue !== undefined) {
      fields.push(`residualValue = $${paramCount++}`);
      values.push(data.residualValue);
    }
    if (data.status !== undefined) {
      fields.push(`status = $${paramCount++}`);
      values.push(data.status);
    }
    if (data.location !== undefined) {
      fields.push(`location = $${paramCount++}`);
      values.push(data.location);
    }
    if (data.responsiblePersonId !== undefined) {
      fields.push(`responsiblePersonId = $${paramCount++}`);
      values.push(data.responsiblePersonId);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE assets SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM assets WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
