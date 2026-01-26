import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    number VARCHAR(255),
    invoiceId INTEGER,
    counterpartyId INTEGER,
    date TIMESTAMP,
    type VARCHAR(255),
    method VARCHAR(255),
    amount INTEGER,
    currency VARCHAR(255),
    description TEXT,
    status VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created payments table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS payments');
  console.log('Dropped payments table');
}
