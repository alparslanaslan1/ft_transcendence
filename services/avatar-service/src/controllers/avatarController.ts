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
  const data = await request.file() as MultipartFile | undefined;
  if (!data) {
    return reply.code(400).send({ error: 'No file uploaded' });
  }

  const userId = Number(request.params.id);
  const result: UploadResult = await uploadAvatar(userId, data);

  if (!result.success) {
    return reply.code(500).send({ error: result.error });
  }

  reply.send({ avatarUrl: result.avatarUrl });
}
