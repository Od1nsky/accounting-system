import pool from '../database/db';

export interface WarehouseOperation {
  id: number;
  date?: Date;
  type?: string;
  productId?: number;
  quantity?: number;
  price?: number;
  warehouse?: string;
  documentNumber?: string;
  counterpartyId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateWarehouseOperation {
  date?: Date;
  type?: string;
  productId?: number;
  quantity?: number;
  price?: number;
  warehouse?: string;
  documentNumber?: string;
  counterpartyId?: number;
}

export interface UpdateWarehouseOperation {
  date?: Date;
  type?: string;
  productId?: number;
  quantity?: number;
  price?: number;
  warehouse?: string;
  documentNumber?: string;
  counterpartyId?: number;
}

export class WarehouseOperationModel {
  static async findAll(): Promise<WarehouseOperation[]> {
    const result = await pool.query('SELECT id, date, type, productId, quantity, price, warehouse, documentNumber, counterpartyId, created_at as createdAt, updated_at as updatedAt FROM warehouseoperations');
    return result.rows;
  }

  static async findById(id: number): Promise<WarehouseOperation | undefined> {
    const result = await pool.query('SELECT id, date, type, productId, quantity, price, warehouse, documentNumber, counterpartyId, created_at as createdAt, updated_at as updatedAt FROM warehouseoperations WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateWarehouseOperation): Promise<WarehouseOperation> {
    const result = await pool.query(
      'INSERT INTO warehouseoperations (date, type, productId, quantity, price, warehouse, documentNumber, counterpartyId) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [data.date, data.type, data.productId, data.quantity, data.price, data.warehouse, data.documentNumber, data.counterpartyId]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateWarehouseOperation): Promise<WarehouseOperation | undefined> {
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
    if (data.productId !== undefined) {
      fields.push(`productId = $${paramCount++}`);
      values.push(data.productId);
    }
    if (data.quantity !== undefined) {
      fields.push(`quantity = $${paramCount++}`);
      values.push(data.quantity);
    }
    if (data.price !== undefined) {
      fields.push(`price = $${paramCount++}`);
      values.push(data.price);
    }
    if (data.warehouse !== undefined) {
      fields.push(`warehouse = $${paramCount++}`);
      values.push(data.warehouse);
    }
    if (data.documentNumber !== undefined) {
      fields.push(`documentNumber = $${paramCount++}`);
      values.push(data.documentNumber);
    }
    if (data.counterpartyId !== undefined) {
      fields.push(`counterpartyId = $${paramCount++}`);
      values.push(data.counterpartyId);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE warehouseoperations SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM warehouseoperations WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
