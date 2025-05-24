// services/friend-service/src/plugins/jwt.ts
import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { FastifyPluginAsync } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate(request: any, reply: any): Promise<void>;
  }
  interface FastifyJWT {
    payload: { id: number; username: string };
    user: { id: number; username: string };
  }
}

const jwtPlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(fastifyJwt, { secret: process.env.JWT_SECRET! });
  fastify.decorate('authenticate', async (request, reply) => {
    try { await request.jwtVerify(); }
    catch (err) { reply.send(err); }
  });
};

export default fp(jwtPlugin);
