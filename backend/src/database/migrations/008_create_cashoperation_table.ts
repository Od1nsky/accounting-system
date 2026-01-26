import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS cashoperations (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP,
    type VARCHAR(255),
    amount INTEGER,
    currency VARCHAR(255),
    purpose TEXT,
    counterpartyId INTEGER,
    employeeId INTEGER,
    documentNumber VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created cashoperations table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS cashoperations');
  console.log('Dropped cashoperations table');
}
