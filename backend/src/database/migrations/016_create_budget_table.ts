import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS budgets (
    id SERIAL PRIMARY KEY,
    period VARCHAR(255),
    category VARCHAR(255),
    type VARCHAR(255),
    plannedAmount INTEGER,
    actualAmount INTEGER,
    variance INTEGER,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created budgets table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS budgets');
  console.log('Dropped budgets table');
}
