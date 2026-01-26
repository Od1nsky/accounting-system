import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contracts (
    id SERIAL PRIMARY KEY,
    number VARCHAR(255),
    counterpartyId INTEGER,
    type VARCHAR(255),
    signDate DATE,
    startDate DATE,
    endDate DATE,
    amount INTEGER,
    status VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created contracts table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS contracts');
  console.log('Dropped contracts table');
}
