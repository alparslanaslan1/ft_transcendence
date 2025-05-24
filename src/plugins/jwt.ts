// src/plugins/jwt.ts

import fp from 'fastify-plugin';
// Plugin’in doğru sırada yüklenmesi ve encapsulation için kullanılır.

import { FastifyPluginAsync } from 'fastify';
// TS’de async plugin imzası

import fastifyJwt from '@fastify/jwt';
// Resmi Fastify JWT eklentisi

// —— Type Declarations ——  
// Fastify’in varsayılan tiplerine ekleme (declaration merging)
declare module 'fastify' {
  interface FastifyInstance {
    authenticate(request: any, reply: any): Promise<void>;
    // app.authenticate kullanıldığında hata fırlatır veya geçerse devam eder
  }
  interface FastifyJWT {
    payload: { id: number; username: string };
    user:    { id: number; username: string };
    // request.jwtVerify() sonrası request.user ve payload tipi
  }
}

const jwtPlugin: FastifyPluginAsync = async (fastify) => {
  // —— 1. @fastify/jwt kaydı ——
  await fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET!
    // .env’den JWT_SECRET (non-null)
  });

  // —— 2. authenticate dekoratörü ——
  fastify.decorate(
    'authenticate',
    async (request, reply) => {
      try {
        // token doğrulaması
        await request.jwtVerify();
      } catch (err) {
        // Geçersizse hatayı geri gönder
        reply.send(err);
      }
    }
  );
};

// fastify-plugin ile sarmala, export et
export default fp(jwtPlugin);
