import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS counterpartys (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(255),
    inn VARCHAR(255),
    kpp VARCHAR(255),
    ogrn VARCHAR(255),
    address TEXT,
    phone VARCHAR(255),
    email VARCHAR(255),
    bankAccount VARCHAR(255),
    bankName VARCHAR(255),
    bik VARCHAR(255),
    isActive BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created counterpartys table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS counterpartys');
  console.log('Dropped counterpartys table');
}
