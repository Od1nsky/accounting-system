import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS reconciliations (
    id SERIAL PRIMARY KEY,
    counterpartyId INTEGER,
    startDate DATE,
    endDate DATE,
    ourBalance INTEGER,
    theirBalance INTEGER,
    difference INTEGER,
    status VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created reconciliations table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS reconciliations');
  console.log('Dropped reconciliations table');
}
