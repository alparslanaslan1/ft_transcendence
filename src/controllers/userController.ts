// src/controllers/userController.ts


import { FastifyReply, FastifyRequest } from 'fastify';
import * as userService from '../services/userService';
import bcrypt from 'bcrypt';


export async function registerUser(
  request: FastifyRequest<{ Body: { username: string; password: string } }>,
  reply: FastifyReply
) {
  try {
    const { username, password } = request.body;
    const user = await userService.createUser(username, password);
    reply.code(201).send(user);
  } catch (err: any) {
    reply.code(500).send({ error: err.message });
  }
}

export async function loginUser(
  request: FastifyRequest<{ Body: { username: string; password: string } }>,
  reply: FastifyReply
) {
  const { username, password } = request.body;
  const user = userService.findUserByUsername(username);
  if (!user) return reply.code(401).send({ error: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return reply.code(401).send({ error: 'Invalid credentials' });

    const token = request.server.jwt.sign({ id: user.id, username: user.username });
    reply.send({ token });
}

export async function deleteUser(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const id = Number(request.params.id);
  const ok = userService.deleteUserById(id);
  if (!ok) return reply.code(404).send({ error: 'User not found' });
  reply.send({ message: 'User deleted' });
}

export async function getUsers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const users = userService.listUsers();
    reply.send(users);
  } catch {
    reply.code(500).send({ error: 'Internal Server Error' });
  }
}
