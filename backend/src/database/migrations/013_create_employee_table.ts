import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    middleName VARCHAR(255),
    position VARCHAR(255),
    department VARCHAR(255),
    hireDate DATE,
    salary INTEGER,
    phone VARCHAR(255),
    email VARCHAR(255),
    passportData TEXT,
    isActive BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created employees table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS employees');
  console.log('Dropped employees table');
}
