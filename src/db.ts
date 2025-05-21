import Database from 'better-sqlite3';
// better-sqlite3 paketiyle senkron SQLite DB bağlantısı kurarız.

import { config } from 'dotenv';
// Tekrar .env’yı yüklemek için

config();
// process.env.DATABASE_FILE tanımlı hale gelir.

export const db = new Database(process.env.DATABASE_FILE!);
// SQLite dosyasını aç (yoksa oluştur). process.env.DATABASE_FILE!=non-null assertion, boş gelmez.

// —— Tablo Oluşturma ——
const init = db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT    UNIQUE NOT NULL,
    password TEXT    NOT NULL
  )
`);
// users tablosu yoksa, id, username ve password alanlarıyla oluşturacak sorguyu hazırlar.

init.run();
// Hazırlanan sorguyu çalıştır: tabloyu oluştur veya zaten varsa atla.

const initFriends = db.prepare(`
  CREATE TABLE IF NOT EXISTS friends (
    user_id   INTEGER NOT NULL,
    friend_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, friend_id),
    FOREIGN KEY (user_id)   REFERENCES users(id),
    FOREIGN KEY (friend_id) REFERENCES users(id)
  )
`);
initFriends.run();