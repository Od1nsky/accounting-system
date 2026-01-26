import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP,
    debitAccount VARCHAR(255),
    creditAccount VARCHAR(255),
    amount INTEGER,
    description TEXT,
    documentNumber VARCHAR(255),
    documentType VARCHAR(255),
    posted BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created transactions table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS transactions');
  console.log('Dropped transactions table');
}
