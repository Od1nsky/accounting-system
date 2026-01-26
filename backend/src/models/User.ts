import pool from '../database/db';
import { User, CreateUser, UpdateUser } from '../types';

export class UserModel {
  static async findAll(): Promise<User[]> {
    const result = await pool.query(
      'SELECT id, email, name, role, created_at as "createdAt" FROM users'
    );
    return result.rows;
  }

  static async findById(id: number): Promise<User | undefined> {
    const result = await pool.query(
      'SELECT id, email, name, role, created_at as "createdAt" FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async findByEmail(email: string): Promise<User | undefined> {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }

  static async create(userData: CreateUser): Promise<User> {
    const result = await pool.query(
      'INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role, created_at as "createdAt"',
      [userData.email, userData.password, userData.name, userData.role || 'user']
    );
    return result.rows[0];
  }

  static async update(id: number, userData: UpdateUser): Promise<User | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (userData.email !== undefined) {
      fields.push(`email = $${paramCount++}`);
      values.push(userData.email);
    }
    if (userData.password !== undefined) {
      fields.push(`password = $${paramCount++}`);
      values.push(userData.password);
    }
    if (userData.name !== undefined) {
      fields.push(`name = $${paramCount++}`);
      values.push(userData.name);
    }
    if (userData.role !== undefined) {
      fields.push(`role = $${paramCount++}`);
      values.push(userData.role);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING id, email, name, role, created_at as "createdAt"`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
