import pool from '../database/db';

export interface Repository {
  id: number;
  projectId?: number;
  name?: string;
  url?: string;
  provider?: string;
  isPrivate?: boolean;
  language?: string;
  lastCommit?: Date;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateRepository {
  projectId?: number;
  name?: string;
  url?: string;
  provider?: string;
  isPrivate?: boolean;
  language?: string;
  lastCommit?: Date;
  status?: string;
}

export interface UpdateRepository {
  projectId?: number;
  name?: string;
  url?: string;
  provider?: string;
  isPrivate?: boolean;
  language?: string;
  lastCommit?: Date;
  status?: string;
}

export class RepositoryModel {
  static async findAll(): Promise<Repository[]> {
    const result = await pool.query('SELECT id, projectId, name, url, provider, isPrivate, language, lastCommit, status, created_at as createdAt, updated_at as updatedAt FROM repositorys');
    return result.rows;
  }

  static async findById(id: number): Promise<Repository | undefined> {
    const result = await pool.query('SELECT id, projectId, name, url, provider, isPrivate, language, lastCommit, status, created_at as createdAt, updated_at as updatedAt FROM repositorys WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateRepository): Promise<Repository> {
    const result = await pool.query(
      'INSERT INTO repositorys (projectId, name, url, provider, isPrivate, language, lastCommit, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [data.projectId, data.name, data.url, data.provider, data.isPrivate, data.language, data.lastCommit, data.status]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateRepository): Promise<Repository | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.projectId !== undefined) {
      fields.push(`projectId = $${paramCount++}`);
      values.push(data.projectId);
    }
    if (data.name !== undefined) {
      fields.push(`name = $${paramCount++}`);
      values.push(data.name);
    }
    if (data.url !== undefined) {
      fields.push(`url = $${paramCount++}`);
      values.push(data.url);
    }
    if (data.provider !== undefined) {
      fields.push(`provider = $${paramCount++}`);
      values.push(data.provider);
    }
    if (data.isPrivate !== undefined) {
      fields.push(`isPrivate = $${paramCount++}`);
      values.push(data.isPrivate);
    }
    if (data.language !== undefined) {
      fields.push(`language = $${paramCount++}`);
      values.push(data.language);
    }
    if (data.lastCommit !== undefined) {
      fields.push(`lastCommit = $${paramCount++}`);
      values.push(data.lastCommit);
    }
    if (data.status !== undefined) {
      fields.push(`status = $${paramCount++}`);
      values.push(data.status);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE repositorys SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM repositorys WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
