import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS inventorys (
    id SERIAL PRIMARY KEY,
    date DATE,
    warehouse VARCHAR(255),
    status VARCHAR(255),
    responsiblePersonId INTEGER,
    notes TEXT,
    completedDate DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created inventorys table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS inventorys');
  console.log('Dropped inventorys table');
}
