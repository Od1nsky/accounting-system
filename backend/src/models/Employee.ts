import pool from '../database/db';

export interface Employee {
  id: number;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  position?: string;
  department?: string;
  hireDate?: Date;
  salary?: number;
  phone?: string;
  email?: string;
  passportData?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEmployee {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  position?: string;
  department?: string;
  hireDate?: Date;
  salary?: number;
  phone?: string;
  email?: string;
  passportData?: string;
  isActive?: boolean;
}

export interface UpdateEmployee {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  position?: string;
  department?: string;
  hireDate?: Date;
  salary?: number;
  phone?: string;
  email?: string;
  passportData?: string;
  isActive?: boolean;
}

export class EmployeeModel {
  static async findAll(): Promise<Employee[]> {
    const result = await pool.query('SELECT id, firstName, lastName, middleName, position, department, hireDate, salary, phone, email, passportData, isActive, created_at as createdAt, updated_at as updatedAt FROM employees');
    return result.rows;
  }

  static async findById(id: number): Promise<Employee | undefined> {
    const result = await pool.query('SELECT id, firstName, lastName, middleName, position, department, hireDate, salary, phone, email, passportData, isActive, created_at as createdAt, updated_at as updatedAt FROM employees WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateEmployee): Promise<Employee> {
    const result = await pool.query(
      'INSERT INTO employees (firstName, lastName, middleName, position, department, hireDate, salary, phone, email, passportData, isActive) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [data.firstName, data.lastName, data.middleName, data.position, data.department, data.hireDate, data.salary, data.phone, data.email, data.passportData, data.isActive]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateEmployee): Promise<Employee | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.firstName !== undefined) {
      fields.push(`firstName = $${paramCount++}`);
      values.push(data.firstName);
    }
    if (data.lastName !== undefined) {
      fields.push(`lastName = $${paramCount++}`);
      values.push(data.lastName);
    }
    if (data.middleName !== undefined) {
      fields.push(`middleName = $${paramCount++}`);
      values.push(data.middleName);
    }
    if (data.position !== undefined) {
      fields.push(`position = $${paramCount++}`);
      values.push(data.position);
    }
    if (data.department !== undefined) {
      fields.push(`department = $${paramCount++}`);
      values.push(data.department);
    }
    if (data.hireDate !== undefined) {
      fields.push(`hireDate = $${paramCount++}`);
      values.push(data.hireDate);
    }
    if (data.salary !== undefined) {
      fields.push(`salary = $${paramCount++}`);
      values.push(data.salary);
    }
    if (data.phone !== undefined) {
      fields.push(`phone = $${paramCount++}`);
      values.push(data.phone);
    }
    if (data.email !== undefined) {
      fields.push(`email = $${paramCount++}`);
      values.push(data.email);
    }
    if (data.passportData !== undefined) {
      fields.push(`passportData = $${paramCount++}`);
      values.push(data.passportData);
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
      `UPDATE employees SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM employees WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
