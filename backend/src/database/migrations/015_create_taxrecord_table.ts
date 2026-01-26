import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS taxrecords (
    id SERIAL PRIMARY KEY,
    period VARCHAR(255),
    taxType VARCHAR(255),
    taxBase INTEGER,
    taxRate INTEGER,
    taxAmount INTEGER,
    status VARCHAR(255),
    filingDate DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created taxrecords table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS taxrecords');
  console.log('Dropped taxrecords table');
}
