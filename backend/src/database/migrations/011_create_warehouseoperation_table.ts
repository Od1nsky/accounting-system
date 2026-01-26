import pool from '../db';

export async function up(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS warehouseoperations (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP,
    type VARCHAR(255),
    productId INTEGER,
    quantity INTEGER,
    price INTEGER,
    warehouse VARCHAR(255),
    documentNumber VARCHAR(255),
    counterpartyId INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Created warehouseoperations table');
}

export async function down(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS warehouseoperations');
  console.log('Dropped warehouseoperations table');
}
