import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    code VARCHAR(255),
    name VARCHAR(255),
    type VARCHAR(255),
    unit VARCHAR(255),
    price INTEGER,
    cost INTEGER,
    vatRate INTEGER,
    description TEXT,
    isActive BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created products table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS products');
  console.log('Dropped products table');
}
