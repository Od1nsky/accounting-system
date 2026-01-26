import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS sprints (
    id SERIAL PRIMARY KEY,
    projectId INTEGER,
    name VARCHAR(255),
    goal TEXT,
    startDate DATE,
    endDate DATE,
    status VARCHAR(255),
    velocity INTEGER,
    capacity INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created sprints table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS sprints');
  console.log('Dropped sprints table');
}
