import pool from '../database/db';

export interface Product {
  id: number;
  code?: string;
  name?: string;
  type?: string;
  unit?: string;
  price?: number;
  cost?: number;
  vatRate?: number;
  description?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProduct {
  code?: string;
  name?: string;
  type?: string;
  unit?: string;
  price?: number;
  cost?: number;
  vatRate?: number;
  description?: string;
  isActive?: boolean;
}

export interface UpdateProduct {
  code?: string;
  name?: string;
  type?: string;
  unit?: string;
  price?: number;
  cost?: number;
  vatRate?: number;
  description?: string;
  isActive?: boolean;
}

export class ProductModel {
  static async findAll(): Promise<Product[]> {
    const result = await pool.query('SELECT id, code, name, type, unit, price, cost, vatRate, description, isActive, created_at as createdAt, updated_at as updatedAt FROM products');
    return result.rows;
  }

  static async findById(id: number): Promise<Product | undefined> {
    const result = await pool.query('SELECT id, code, name, type, unit, price, cost, vatRate, description, isActive, created_at as createdAt, updated_at as updatedAt FROM products WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateProduct): Promise<Product> {
    const result = await pool.query(
      'INSERT INTO products (code, name, type, unit, price, cost, vatRate, description, isActive) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [data.code, data.name, data.type, data.unit, data.price, data.cost, data.vatRate, data.description, data.isActive]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateProduct): Promise<Product | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.code !== undefined) {
      fields.push(`code = $${paramCount++}`);
      values.push(data.code);
    }
    if (data.name !== undefined) {
      fields.push(`name = $${paramCount++}`);
      values.push(data.name);
    }
    if (data.type !== undefined) {
      fields.push(`type = $${paramCount++}`);
      values.push(data.type);
    }
    if (data.unit !== undefined) {
      fields.push(`unit = $${paramCount++}`);
      values.push(data.unit);
    }
    if (data.price !== undefined) {
      fields.push(`price = $${paramCount++}`);
      values.push(data.price);
    }
    if (data.cost !== undefined) {
      fields.push(`cost = $${paramCount++}`);
      values.push(data.cost);
    }
    if (data.vatRate !== undefined) {
      fields.push(`vatRate = $${paramCount++}`);
      values.push(data.vatRate);
    }
    if (data.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(data.description);
    }
    if (data.isActive !== undefined) {
      fields.push(`isActive = $${paramCount++}`);
      values.push(data.isActive);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE products SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM products WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
