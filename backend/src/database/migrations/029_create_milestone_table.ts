import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS milestones (
    id SERIAL PRIMARY KEY,
    projectId INTEGER,
    name VARCHAR(255),
    description TEXT,
    dueDate DATE,
    completedDate DATE,
    status VARCHAR(255),
    paymentAmount INTEGER,
    paid BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created milestones table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS milestones');
  console.log('Dropped milestones table');
}
