import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS repositorys (
    id SERIAL PRIMARY KEY,
    projectId INTEGER,
    name VARCHAR(255),
    url VARCHAR(255),
    provider VARCHAR(255),
    isPrivate BOOLEAN,
    language VARCHAR(255),
    lastCommit TIMESTAMP,
    status VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created repositorys table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS repositorys');
  console.log('Dropped repositorys table');
}
