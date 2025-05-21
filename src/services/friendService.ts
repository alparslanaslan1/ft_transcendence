import { db } from '../db';
import { PublicUser } from './userService';

/**
 * İki kullanıcı arasında arkadaşlık ekler.
 * @param userId – Arkadaş ekleyen kullanıcının ID’si
 * @param friendId – Eklenecek arkadaşın ID’si
 * @returns Başarılıysa true, başarısızsa false
 */
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

/**
 * Kullanıcının arkadaş listesinden birini siler.
 */
export function removeFriend(userId: number, friendId: number): boolean {
  const stmt = db.prepare(
    `DELETE FROM friends WHERE user_id = ? AND friend_id = ?`
  );
  const info = stmt.run(userId, friendId);
  return info.changes > 0;
}

/**
 * Kullanıcının arkadaş listesini döner.
 */
export function listFriends(userId: number): PublicUser[] {
  const stmt = db.prepare(
    `SELECT u.id, u.username
     FROM users u
     JOIN friends f ON u.id = f.friend_id
     WHERE f.user_id = ?`
  );
  return stmt.all(userId) as PublicUser[];
}