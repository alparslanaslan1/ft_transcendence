import { db } from '../db';
import bcrypt from 'bcrypt';

export interface User {
  id: number;
  username: string;
  password: string;
}

export interface PublicUser {
  id: number;
  username: string;
}

export async function createUser(
  username: string,
  plainPassword: string
): Promise<PublicUser> {
  const hash = await bcrypt.hash(plainPassword, 10);
  const stmt = db.prepare(
    'INSERT INTO users (username, password) VALUES (?, ?)'
  );
  const info = stmt.run(username, hash);
  return { id: info.lastInsertRowid as number, username };
}

export function findUserByUsername(
  username: string
): User | undefined {
  return db
    .prepare('SELECT id, username, password FROM users WHERE username = ?')
    .get(username) as User | undefined;
}

export function deleteUserById(id: number): boolean {
  const stmt = db.prepare('DELETE FROM users WHERE id = ?');
  const info = stmt.run(id);
  return info.changes > 0;
}

export function listUsers(): PublicUser[] {
  return db
    .prepare('SELECT id, username FROM users')
    .all() as PublicUser[];
}
