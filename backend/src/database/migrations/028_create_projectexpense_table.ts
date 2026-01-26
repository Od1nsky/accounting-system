import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS projectexpenses (
    id SERIAL PRIMARY KEY,
    projectId INTEGER,
    date DATE,
    category VARCHAR(255),
    amount INTEGER,
    description TEXT,
    receipt VARCHAR(255),
    approved BOOLEAN,
    reimbursable BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created projectexpenses table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS projectexpenses');
  console.log('Dropped projectexpenses table');
}
