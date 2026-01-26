import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    provider VARCHAR(255),
    type VARCHAR(255),
    cost INTEGER,
    billingPeriod VARCHAR(255),
    startDate DATE,
    endDate DATE,
    autoRenew BOOLEAN,
    status VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created subscriptions table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS subscriptions');
  console.log('Dropped subscriptions table');
}
