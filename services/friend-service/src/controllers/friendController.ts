import { FastifyRequest, FastifyReply } from 'fastify';
import {
  addFriend,
  removeFriend,
  listFriends,
  PublicUser
} from '../services/friendService';

interface FriendParams {
  friendId: string;
}

export async function addFriendHandler(
  request: FastifyRequest<{ Params: FriendParams }>,
  reply: FastifyReply
) {
  const userId = (request.user as { id: number }).id;
  const friendId = Number(request.params.friendId);

  const ok = addFriend(userId, friendId);
  if (!ok) {
    return reply.code(400).send({ error: 'Could not add friend' });
  }

  reply.code(201).send({ message: 'Friend added' });
}

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


