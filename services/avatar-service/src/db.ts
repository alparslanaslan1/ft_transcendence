import Database from 'better-sqlite3';
import { config } from 'dotenv';
config();

export const db = new Database(process.env.DATABASE_FILE!, { verbose: console.log });

// (Opsiyonel) Eğer users tablosu yoksa oluşturur.
// user-service zaten oluşturuyor; burada tekrara gerek yok.
