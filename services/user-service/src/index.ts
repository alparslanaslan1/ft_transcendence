import Fastify from 'fastify';
import { config } from 'dotenv';
import { userRoutes } from './routes/userRoutes';

config();
const app = Fastify({ logger: true });

// user routes'ları kaydet
app.register(userRoutes);

const port = Number(process.env.SERVICE_PORT ?? 3001);
app.listen({ port, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`User Service listening at ${address}`);
});
