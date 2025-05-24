import { db } from '../db';

export interface PublicUser {
  id:       number;
  username: string;
}

export function addFriend(userId: number, friendId: number): boolean {
  if (userId === friendId) return false;
  const stmt = db.prepare(
    `INSERT INTO friends (user_id, friend_id) VALUES (?, ?)`
  );
  try {
    const info = stmt.run(userId, friendId);
    return info.changes > 0;
  } catch {
    return false;
  }
}

export function removeFriend(userId: number, friendId: number): boolean {
  const stmt = db.prepare(
    `DELETE FROM friends WHERE user_id = ? AND friend_id = ?`
  );
  const info = stmt.run(userId, friendId);
  return info.changes > 0;
}

export function listFriends(userId: number): PublicUser[] {
  const stmt = db.prepare(
    `SELECT u.id, u.username
     FROM users u
     JOIN friends f ON u.id = f.friend_id
     WHERE f.user_id = ?`
  );
  return stmt.all(userId) as PublicUser[];
}
