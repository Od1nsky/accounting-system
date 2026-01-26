import pool from '../database/db';

export interface Client {
  id: number;
  name?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  company?: string;
  website?: string;
  address?: string;
  inn?: string;
  contractNumber?: string;
  status?: string;
  industryType?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateClient {
  name?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  company?: string;
  website?: string;
  address?: string;
  inn?: string;
  contractNumber?: string;
  status?: string;
  industryType?: string;
  isActive?: boolean;
}

export interface UpdateClient {
  name?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  company?: string;
  website?: string;
  address?: string;
  inn?: string;
  contractNumber?: string;
  status?: string;
  industryType?: string;
  isActive?: boolean;
}

export class ClientModel {
  static async findAll(): Promise<Client[]> {
    const result = await pool.query('SELECT id, name, contactPerson, email, phone, company, website, address, inn, contractNumber, status, industryType, isActive, created_at as createdAt, updated_at as updatedAt FROM clients');
    return result.rows;
  }

  static async findById(id: number): Promise<Client | undefined> {
    const result = await pool.query('SELECT id, name, contactPerson, email, phone, company, website, address, inn, contractNumber, status, industryType, isActive, created_at as createdAt, updated_at as updatedAt FROM clients WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateClient): Promise<Client> {
    const result = await pool.query(
      'INSERT INTO clients (name, contactPerson, email, phone, company, website, address, inn, contractNumber, status, industryType, isActive) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [data.name, data.contactPerson, data.email, data.phone, data.company, data.website, data.address, data.inn, data.contractNumber, data.status, data.industryType, data.isActive]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateClient): Promise<Client | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.name !== undefined) {
      fields.push(`name = $${paramCount++}`);
      values.push(data.name);
    }
    if (data.contactPerson !== undefined) {
      fields.push(`contactPerson = $${paramCount++}`);
      values.push(data.contactPerson);
    }
    if (data.email !== undefined) {
      fields.push(`email = $${paramCount++}`);
      values.push(data.email);
    }
    if (data.phone !== undefined) {
      fields.push(`phone = $${paramCount++}`);
      values.push(data.phone);
    }
    if (data.company !== undefined) {
      fields.push(`company = $${paramCount++}`);
      values.push(data.company);
    }
    if (data.website !== undefined) {
      fields.push(`website = $${paramCount++}`);
      values.push(data.website);
    }
    if (data.address !== undefined) {
      fields.push(`address = $${paramCount++}`);
      values.push(data.address);
    }
    if (data.inn !== undefined) {
      fields.push(`inn = $${paramCount++}`);
      values.push(data.inn);
    }
    if (data.contractNumber !== undefined) {
      fields.push(`contractNumber = $${paramCount++}`);
      values.push(data.contractNumber);
    }
    if (data.status !== undefined) {
      fields.push(`status = $${paramCount++}`);
      values.push(data.status);
    }
    if (data.industryType !== undefined) {
      fields.push(`industryType = $${paramCount++}`);
      values.push(data.industryType);
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
      `UPDATE clients SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM clients WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
