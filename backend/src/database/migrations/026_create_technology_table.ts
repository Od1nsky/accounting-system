import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS technologys (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    category VARCHAR(255),
    version VARCHAR(255),
    description TEXT,
    licenseType VARCHAR(255),
    isActive BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created technologys table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS technologys');
  console.log('Dropped technologys table');
}
