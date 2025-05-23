import fp from 'fastify-plugin'
import fastifyMultipart from '@fastify/multipart';

export default fp(async(app) =>
{
    await app.register(fastifyMultipart, { addToBody: false});
});