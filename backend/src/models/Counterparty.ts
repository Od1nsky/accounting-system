import pool from '../database/db';

export interface Counterparty {
  id: number;
  name?: string;
  type?: string;
  inn?: string;
  kpp?: string;
  ogrn?: string;
  address?: string;
  phone?: string;
  email?: string;
  bankAccount?: string;
  bankName?: string;
  bik?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCounterparty {
  name?: string;
  type?: string;
  inn?: string;
  kpp?: string;
  ogrn?: string;
  address?: string;
  phone?: string;
  email?: string;
  bankAccount?: string;
  bankName?: string;
  bik?: string;
  isActive?: boolean;
}

export interface UpdateCounterparty {
  name?: string;
  type?: string;
  inn?: string;
  kpp?: string;
  ogrn?: string;
  address?: string;
  phone?: string;
  email?: string;
  bankAccount?: string;
  bankName?: string;
  bik?: string;
  isActive?: boolean;
}

export class CounterpartyModel {
  static async findAll(): Promise<Counterparty[]> {
    const result = await pool.query('SELECT id, name, type, inn, kpp, ogrn, address, phone, email, bankAccount, bankName, bik, isActive, created_at as createdAt, updated_at as updatedAt FROM counterpartys');
    return result.rows;
  }

  static async findById(id: number): Promise<Counterparty | undefined> {
    const result = await pool.query('SELECT id, name, type, inn, kpp, ogrn, address, phone, email, bankAccount, bankName, bik, isActive, created_at as createdAt, updated_at as updatedAt FROM counterpartys WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateCounterparty): Promise<Counterparty> {
    const result = await pool.query(
      'INSERT INTO counterpartys (name, type, inn, kpp, ogrn, address, phone, email, bankAccount, bankName, bik, isActive) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [data.name, data.type, data.inn, data.kpp, data.ogrn, data.address, data.phone, data.email, data.bankAccount, data.bankName, data.bik, data.isActive]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateCounterparty): Promise<Counterparty | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.name !== undefined) {
      fields.push(`name = $${paramCount++}`);
      values.push(data.name);
    }
    if (data.type !== undefined) {
      fields.push(`type = $${paramCount++}`);
      values.push(data.type);
    }
    if (data.inn !== undefined) {
      fields.push(`inn = $${paramCount++}`);
      values.push(data.inn);
    }
    if (data.kpp !== undefined) {
      fields.push(`kpp = $${paramCount++}`);
      values.push(data.kpp);
    }
    if (data.ogrn !== undefined) {
      fields.push(`ogrn = $${paramCount++}`);
      values.push(data.ogrn);
    }
    if (data.address !== undefined) {
      fields.push(`address = $${paramCount++}`);
      values.push(data.address);
    }
    if (data.phone !== undefined) {
      fields.push(`phone = $${paramCount++}`);
      values.push(data.phone);
    }
    if (data.email !== undefined) {
      fields.push(`email = $${paramCount++}`);
      values.push(data.email);
    }
    if (data.bankAccount !== undefined) {
      fields.push(`bankAccount = $${paramCount++}`);
      values.push(data.bankAccount);
    }
    if (data.bankName !== undefined) {
      fields.push(`bankName = $${paramCount++}`);
      values.push(data.bankName);
    }
    if (data.bik !== undefined) {
      fields.push(`bik = $${paramCount++}`);
      values.push(data.bik);
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
      `UPDATE counterpartys SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM counterpartys WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
