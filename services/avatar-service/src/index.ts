import Fastify from 'fastify';
import { config } from 'dotenv';
import { avatarRoutes } from './routes/avatarRoutes';

config();
const app = Fastify({ logger: true });

app.register(avatarRoutes);

const port = Number(process.env.SERVICE_PORT ?? 3003);
app.listen({ port, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Avatar Service listening at ${address}`);
});
