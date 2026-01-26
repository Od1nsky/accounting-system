import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS invoices (
    id SERIAL PRIMARY KEY,
    number VARCHAR(255),
    counterpartyId INTEGER,
    contractId INTEGER,
    date DATE,
    dueDate DATE,
    totalAmount INTEGER,
    vatAmount INTEGER,
    status VARCHAR(255),
    paid BOOLEAN,
    paidDate DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created invoices table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS invoices');
  console.log('Dropped invoices table');
}
