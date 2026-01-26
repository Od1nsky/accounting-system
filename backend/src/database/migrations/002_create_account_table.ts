import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL PRIMARY KEY,
    code VARCHAR(255),
    name VARCHAR(255),
    type VARCHAR(255),
    parentCode VARCHAR(255),
    description TEXT,
    isActive BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created accounts table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS accounts');
  console.log('Dropped accounts table');
}
