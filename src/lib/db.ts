import { join } from 'path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDB() {
  // Use an absolute path to ensure SQLite can access the file
  const dbPath = join(process.cwd(), 'database.sqlite');
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}
