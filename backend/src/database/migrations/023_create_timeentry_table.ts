import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS timeentrys (
    id SERIAL PRIMARY KEY,
    employeeId INTEGER,
    projectId INTEGER,
    taskId INTEGER,
    date DATE,
    hours INTEGER,
    description TEXT,
    billable BOOLEAN,
    hourlyRate INTEGER,
    approved BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created timeentrys table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS timeentrys');
  console.log('Dropped timeentrys table');
}
