import { openDB } from '../../../lib/db';

export async function GET() {
  const db = await openDB();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS snippets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url_id TEXT UNIQUE NOT NULL,
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      snippet_id INTEGER,
      file_url TEXT NOT NULL,
      file_name TEXT NOT NULL,
      FOREIGN KEY (snippet_id) REFERENCES snippets(id) ON DELETE CASCADE
    );
  `);

  return new Response(JSON.stringify({ message: 'Database setup complete' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
