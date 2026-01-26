import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    clientId INTEGER,
    code VARCHAR(255),
    type VARCHAR(255),
    status VARCHAR(255),
    startDate DATE,
    endDate DATE,
    budget INTEGER,
    actualCost INTEGER,
    hourlyRate INTEGER,
    description TEXT,
    repository VARCHAR(255),
    isActive BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created projects table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS projects');
  console.log('Dropped projects table');
}
