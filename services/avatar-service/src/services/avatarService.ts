import { db } from '../db';
import { promises as fs } from 'fs';
import path from 'path';
import type { MultipartFile } from '@fastify/multipart';

export interface UploadResult {
  success: boolean;
  avatarUrl?: string;
  error?: string;
}

export async function uploadAvatar(
  userId: number,
  file: MultipartFile
): Promise<UploadResult> {
  // 1) Kullanıcının varlığını kontrol et
  const user = db
    .prepare('SELECT id FROM users WHERE id = ?')
    .get(userId) as { id: number } | undefined;
  if (!user) {
    return { success: false, error: 'Invalid user' };
  }

  try {
    // 2) Benzersiz dosya adı
    const ext = path.extname(file.filename);
    const fileName = `user_${userId}_${Date.now()}${ext}`;
    const uploadDir = path.join(process.cwd(), 'uploads', 'avatars');
    const filePath = path.join(uploadDir, fileName);

    // 3) Klasör yoksa oluştur
    await fs.mkdir(uploadDir, { recursive: true });

    // 4) Dosyayı disk’e yaz
    const buffer = await file.toBuffer();
    await fs.writeFile(filePath, buffer);

    // 5) DB’de avatar sütununu güncelle
    const avatarRelPath = `avatars/${fileName}`;
    db.prepare('UPDATE users SET avatar = ? WHERE id = ?')
      .run(avatarRelPath, userId);

    // 6) Başarı
    return {
      success: true,
      avatarUrl: `${process.env.AVATAR_BASE_URL}/${fileName}`
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
