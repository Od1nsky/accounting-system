import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS assets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    inventoryNumber VARCHAR(255),
    category VARCHAR(255),
    cost INTEGER,
    purchaseDate DATE,
    depreciationRate INTEGER,
    residualValue INTEGER,
    status VARCHAR(255),
    location VARCHAR(255),
    responsiblePersonId INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created assets table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS assets');
  console.log('Dropped assets table');
}
