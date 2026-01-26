import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS salarypayments (
    id SERIAL PRIMARY KEY,
    employeeId INTEGER,
    period VARCHAR(255),
    baseSalary INTEGER,
    bonus INTEGER,
    deduction INTEGER,
    totalAmount INTEGER,
    paymentDate DATE,
    status VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created salarypayments table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS salarypayments');
  console.log('Dropped salarypayments table');
}
