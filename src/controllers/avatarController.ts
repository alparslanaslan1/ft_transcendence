// src/controllers/avatarController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { uploadAvatar, UploadResult } from '../services/avatarService';
import type { MultipartFile } from '@fastify/multipart';

interface Params {
  id: string;
}

export async function uploadAvatarHandler(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply
) {
  // 1) Authenticate sonrası request.file() ile MultipartFile al
  const data = await request.file() as MultipartFile | undefined;
  if (!data) {
    return reply.code(400).send({ error: 'No file uploaded' });
  }

  const userId = Number(request.params.id);

  // 2) Servisi çağır
  const result: UploadResult = await uploadAvatar(userId, data);
  if (!result.success) {
    return reply.code(500).send({ error: result.error });
  }

  // 3) Başarı
  reply.send({ avatarUrl: result.avatarUrl });
}
