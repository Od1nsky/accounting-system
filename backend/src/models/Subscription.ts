import pool from '../database/db';

export interface Subscription {
  id: number;
  name?: string;
  provider?: string;
  type?: string;
  cost?: number;
  billingPeriod?: string;
  startDate?: Date;
  endDate?: Date;
  autoRenew?: boolean;
  status?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSubscription {
  name?: string;
  provider?: string;
  type?: string;
  cost?: number;
  billingPeriod?: string;
  startDate?: Date;
  endDate?: Date;
  autoRenew?: boolean;
  status?: string;
  description?: string;
}

export interface UpdateSubscription {
  name?: string;
  provider?: string;
  type?: string;
  cost?: number;
  billingPeriod?: string;
  startDate?: Date;
  endDate?: Date;
  autoRenew?: boolean;
  status?: string;
  description?: string;
}

export class SubscriptionModel {
  static async findAll(): Promise<Subscription[]> {
    const result = await pool.query('SELECT id, name, provider, type, cost, billingPeriod, startDate, endDate, autoRenew, status, description, created_at as createdAt, updated_at as updatedAt FROM subscriptions');
    return result.rows;
  }

  static async findById(id: number): Promise<Subscription | undefined> {
    const result = await pool.query('SELECT id, name, provider, type, cost, billingPeriod, startDate, endDate, autoRenew, status, description, created_at as createdAt, updated_at as updatedAt FROM subscriptions WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data: CreateSubscription): Promise<Subscription> {
    const result = await pool.query(
      'INSERT INTO subscriptions (name, provider, type, cost, billingPeriod, startDate, endDate, autoRenew, status, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [data.name, data.provider, data.type, data.cost, data.billingPeriod, data.startDate, data.endDate, data.autoRenew, data.status, data.description]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateSubscription): Promise<Subscription | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.name !== undefined) {
      fields.push(`name = $${paramCount++}`);
      values.push(data.name);
    }
    if (data.provider !== undefined) {
      fields.push(`provider = $${paramCount++}`);
      values.push(data.provider);
    }
    if (data.type !== undefined) {
      fields.push(`type = $${paramCount++}`);
      values.push(data.type);
    }
    if (data.cost !== undefined) {
      fields.push(`cost = $${paramCount++}`);
      values.push(data.cost);
    }
    if (data.billingPeriod !== undefined) {
      fields.push(`billingPeriod = $${paramCount++}`);
      values.push(data.billingPeriod);
    }
    if (data.startDate !== undefined) {
      fields.push(`startDate = $${paramCount++}`);
      values.push(data.startDate);
    }
    if (data.endDate !== undefined) {
      fields.push(`endDate = $${paramCount++}`);
      values.push(data.endDate);
    }
    if (data.autoRenew !== undefined) {
      fields.push(`autoRenew = $${paramCount++}`);
      values.push(data.autoRenew);
    }
    if (data.status !== undefined) {
      fields.push(`status = $${paramCount++}`);
      values.push(data.status);
    }
    if (data.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(data.description);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE subscriptions SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM subscriptions WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
