// src/plugins/fastifyMultipart.ts
import fp from 'fastify-plugin'
import fastifyMultipart from '@fastify/multipart';

export default fp(async (app) => {
    await app.register(fastifyMultipart, {
      addToBody: false,
      limits: {
        // Dosya başına maksimum 10 MB
        fileSize: 10 * 1024 * 1024
      }
    });
  });
  