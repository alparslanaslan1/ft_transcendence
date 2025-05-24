// src/controllers/friendController.ts

import { FastifyRequest, FastifyReply } from 'fastify';
import {
  addFriend,
  removeFriend,
  listFriends
} from '../services/friendService';
import { PublicUser } from '../services/userService';

interface FriendParams {
  friendId: string;
}

// 1. Arkadaş ekleme
export async function addFriendHandler(
  request: FastifyRequest<{ Params: FriendParams }>,
  reply: FastifyReply
) {
  // Kullanıcı ID’si JWT payload’ında yer alır
  const userId = (request.user as { id: number }).id;
  const friendId = Number(request.params.friendId);

  const ok = addFriend(userId, friendId);
  if (!ok) {
    // Zaten ekli veya geçersiz istek
    return reply.code(400).send({ error: 'Could not add friend' });
  }

  reply.code(201).send({ message: 'Friend added' });
}

// 2. Arkadaş silme
export async function removeFriendHandler(
  request: FastifyRequest<{ Params: FriendParams }>,
  reply: FastifyReply
) {
  const userId = (request.user as { id: number }).id;
  const friendId = Number(request.params.friendId);

  const ok = removeFriend(userId, friendId);
  if (!ok) {
    return reply.code(404).send({ error: 'Friend not found' });
  }

  reply.send({ message: 'Friend removed' });
}

// 3. Arkadaş listesini getirme
export async function listFriendsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userId = (request.user as { id: number }).id;

  try {
    const friends: PublicUser[] = listFriends(userId);
    reply.send(friends);
  } catch (err: any) {
    reply.code(500).send({ error: 'Internal Server Error' });
  }
}
