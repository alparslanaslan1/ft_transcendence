// src/plugins/static.ts
import fp from 'fastify-plugin';
import fastifyStatic from '@fastify/static';
import path from 'path';

export default fp(async (app) => {
  app.register(fastifyStatic, {
    root: path.join(__dirname, '../../uploads/avatars'),
    prefix: '/avatars/',
    decorateReply: false
  });
});
