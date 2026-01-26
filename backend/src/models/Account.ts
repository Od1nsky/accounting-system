import pool from '../database/db';

export interface Account {
  id: number;
  code?: string;
  name?: string;
  type?: string;
  parentCode?: string;
  description?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAccount {
  code?: string;
  name?: string;
  type?: string;
  parentCode?: string;
  description?: string;
  isActive?: boolean;
}

export interface UpdateAccount {
  code?: string;
  name?: string;
  type?: string;
  parentCode?: string;
  description?: string;
  isActive?: boolean;
}

export class AccountModel {
  static async findAll(): Promise<Account[]> {
    const result = await pool.query('SELECT id, code, name, type, parentCode, description, isActive, created_at as createdAt, updated_at as updatedAt FROM accounts');
    return result.rows;
  }

  static async findById(id: number): Promise<Account | undefined> {
    const result = await pool.query('SELECT id, code, name, type, parentCode, description, isActive, created_at as createdAt, updated_at as updatedAt FROM accounts WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateAccount): Promise<Account> {
    const result = await pool.query(
      'INSERT INTO accounts (code, name, type, parentCode, description, isActive) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [data.code, data.name, data.type, data.parentCode, data.description, data.isActive]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateAccount): Promise<Account | undefined> {
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
    if (data.parentCode !== undefined) {
      fields.push(`parentCode = $${paramCount++}`);
      values.push(data.parentCode);
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
      `UPDATE accounts SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM accounts WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
