import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    contactPerson VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    company VARCHAR(255),
    website VARCHAR(255),
    address TEXT,
    inn VARCHAR(255),
    contractNumber VARCHAR(255),
    status VARCHAR(255),
    industryType VARCHAR(255),
    isActive BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created clients table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS clients');
  console.log('Dropped clients table');
}
