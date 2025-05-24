import Fastify from 'fastify';
import { config } from 'dotenv';
import { friendRoutes } from './routes/friendRoutes';

config();
const app = Fastify({ logger: true });

app.register(friendRoutes);

const port = Number(process.env.SERVICE_PORT ?? 3002);
app.listen({ port, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Friend Service listening at ${address}`);
});
