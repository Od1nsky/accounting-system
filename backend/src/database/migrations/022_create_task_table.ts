import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    projectId INTEGER,
    title VARCHAR(255),
    description TEXT,
    type VARCHAR(255),
    priority VARCHAR(255),
    status VARCHAR(255),
    assignedTo INTEGER,
    estimatedHours INTEGER,
    actualHours INTEGER,
    startDate DATE,
    dueDate DATE,
    completedDate DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created tasks table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS tasks');
  console.log('Dropped tasks table');
}
