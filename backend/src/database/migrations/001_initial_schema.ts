import pool from '../db';

export async function runMigrations(): Promise<void> {
  try {
    console.log('Starting database migrations...');

  // Users table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Created users table');

  // Create default admin user
  const bcrypt = require('bcrypt');
  const adminPassword = await bcrypt.hash('admin123', 10);

  const adminExists = await pool.query('SELECT id FROM users WHERE email = $1', ['admin@example.com']);
  if (adminExists.rows.length === 0) {
    await pool.query(
      'INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4)',
      ['admin@example.com', adminPassword, 'Admin User', 'admin']
    );

    console.log('Created default admin user (email: admin@example.com, password: admin123)');
  }

    console.log('All migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}
