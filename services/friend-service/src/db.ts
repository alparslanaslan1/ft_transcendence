import Database from 'better-sqlite3';
import { config } from 'dotenv';
config();

// Aynı kullanıcı veritabanını kullanmak üzere, tek bir SQLite dosyası
export const db = new Database(process.env.DATABASE_FILE!, { verbose: console.log });

// Arkadaşlık tablosunu oluştur (yoksa)
db.prepare(`
  CREATE TABLE IF NOT EXISTS friends (
    user_id   INTEGER NOT NULL,
    friend_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, friend_id),
    FOREIGN KEY (user_id)   REFERENCES users(id),
    FOREIGN KEY (friend_id) REFERENCES users(id)
  )
`).run();
