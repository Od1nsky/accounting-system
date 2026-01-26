import pool from '../database/db';

export interface Technology {
  id: number;
  name?: string;
  category?: string;
  version?: string;
  description?: string;
  licenseType?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTechnology {
  name?: string;
  category?: string;
  version?: string;
  description?: string;
  licenseType?: string;
  isActive?: boolean;
}

export interface UpdateTechnology {
  name?: string;
  category?: string;
  version?: string;
  description?: string;
  licenseType?: string;
  isActive?: boolean;
}

export class TechnologyModel {
  static async findAll(): Promise<Technology[]> {
    const result = await pool.query('SELECT id, name, category, version, description, licenseType, isActive, created_at as createdAt, updated_at as updatedAt FROM technologys');
    return result.rows;
  }

  static async findById(id: number): Promise<Technology | undefined> {
    const result = await pool.query('SELECT id, name, category, version, description, licenseType, isActive, created_at as createdAt, updated_at as updatedAt FROM technologys WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateTechnology): Promise<Technology> {
    const result = await pool.query(
      'INSERT INTO technologys (name, category, version, description, licenseType, isActive) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [data.name, data.category, data.version, data.description, data.licenseType, data.isActive]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateTechnology): Promise<Technology | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.name !== undefined) {
      fields.push(`name = $${paramCount++}`);
      values.push(data.name);
    }
    if (data.category !== undefined) {
      fields.push(`category = $${paramCount++}`);
      values.push(data.category);
    }
    if (data.version !== undefined) {
      fields.push(`version = $${paramCount++}`);
      values.push(data.version);
    }
    if (data.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(data.description);
    }
    if (data.licenseType !== undefined) {
      fields.push(`licenseType = $${paramCount++}`);
      values.push(data.licenseType);
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
      `UPDATE technologys SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM technologys WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
