import path from 'path';
import { FastifyInstance } from 'fastify';
import jwtPlugin from '../plugins/jwt';
import { uploadAvatarHandler } from '../controllers/avatarController';

export async function avatarRoutes(app: FastifyInstance) {
  await app.register(jwtPlugin);
  await app.register(import('@fastify/multipart'));
  await app.register(import('@fastify/static'), {
    root: path.join(__dirname, '../../uploads/avatars'),
    prefix: '/avatars/',
    decorateReply: false
  });

  app.post(
    '/users/:id/avatar',
    { preValidation: [app.authenticate], config: { consumes: ['multipart/form-data'] } },
    uploadAvatarHandler
  );
}
