import { runMigrations } from './migrations/001_initial_schema';

export async function initDatabase(): Promise<void> {
  try {
    await runMigrations();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
