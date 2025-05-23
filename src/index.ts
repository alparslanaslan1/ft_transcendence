
import Fastify from 'fastify';
import { config } from 'dotenv';
import jwtPlugin from './plugins/jwt';
import { userRoutes } from './routes/userRoutes';
import { friendRoutes } from './routes/friendRoutes';
import multipartPlugin from './plugins/multiPart';
import staticPlugin    from './plugins/static';


config();
const app = Fastify({ logger: true });

// plugin’leri önce kaydet
app.register(jwtPlugin);

// route modüllerini ekle
app.register(userRoutes);

app.register(friendRoutes);

app.register(multipartPlugin);
app.register(staticPlugin);

app.listen({ port: Number(process.env.FASTIFY_PORT), host: '0.0.0.0' });
