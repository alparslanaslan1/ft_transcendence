// src/routes/avatarRoutes.ts
import { FastifyInstance } from 'fastify';
import { uploadAvatarHandler } from '../controllers/avatarController';

export async function avatarRoutes(app: FastifyInstance) {
  app.post(
    '/users/:id/avatar',
    {
      preValidation: [app.authenticate],
      config: {
        consumes: ['multipart/form-data']
      }
    },
    uploadAvatarHandler
  );
}