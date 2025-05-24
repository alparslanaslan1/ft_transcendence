import Database from 'better-sqlite3';
import { config } from 'dotenv';
config();

export const db = new Database(process.env.DATABASE_FILE!, { verbose: console.log });

// Initialize tables if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT    UNIQUE NOT NULL,
    avatar   TEXT    DEFAULT NULL,
    password TEXT    NOT NULL
  )
`).run();
