import fp from 'fastify-plugin';
import fastifyStatic from '@fastify/static';
import path from 'path';

export default fp(async (app) => {
  app.register(fastifyStatic, {
    root: path.join(__dirname, '../../uploads'),  // host’ta uploads klasörünün yolu
    prefix: '/avatars/',                           // tarayıcıda /avatars/xxx.jpg şeklinde erişim
    decorateReply: false
  });
});
