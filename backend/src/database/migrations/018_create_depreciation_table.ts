import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS depreciations (
    id SERIAL PRIMARY KEY,
    assetId INTEGER,
    period VARCHAR(255),
    amount INTEGER,
    accumulatedAmount INTEGER,
    calculationDate TIMESTAMP,
    posted BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created depreciations table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS depreciations');
  console.log('Dropped depreciations table');
}
