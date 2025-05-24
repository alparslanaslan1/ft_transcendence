// src/services/userService.ts


import { db } from '../db';
import bcrypt from 'bcrypt';
import { removeAllFriendsForUser } from './friendService';

export interface User {
  id        : number;
  username  : string;
  password  : string;
}

export interface PublicUser {
  id        : number;
  username  : string;
  avatarUrl : string
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
  const id = info.lastInsertRowid as number;
  // avatar alanı henüz null olduğu için default.png kullanıyoruz
  const avatarUrl = `${process.env.AVATAR_BASE_URL}/default.png`;
  return { id, username, avatarUrl };
}


export function findUserByUsername(
  username: string
): User | undefined {
  return db
    .prepare('SELECT id, username, password FROM users WHERE username = ?')
    .get(username) as User | undefined;
}

export function deleteUserById(id: number): boolean {
  removeAllFriendsForUser(id);
  const stmt = db.prepare('DELETE FROM users WHERE id = ?');
  const info = stmt.run(id);
  return info.changes > 0;
}

export function listUsers(): PublicUser[] {
  // avatar sütununu da çek
  const rows = db
    .prepare('SELECT id, username, avatar FROM users')
    .all() as { id: number; username: string; avatar: string | null }[];

  return rows.map(row => {
    // avatar null ise default.png kullan
    const fileName = row.avatar ?? 'default.png';
    const avatarUrl = `${process.env.AVATAR_BASE_URL}/${fileName}`;
    return {
      id:       row.id,
      username: row.username,
      avatarUrl
    };
  });
}
