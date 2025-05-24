import { FastifyInstance } from 'fastify';
// doğru import (route dosyasından bir üst klasöre çıkıp plugins içine)
//  routes/userRoutes.ts  →  plugins/jwt.ts
import jwtPlugin from '../plugins/jwt';
import * as userCtrl from '../controllers/userController';

export async function userRoutes(app: FastifyInstance) {
  // plugin’i öne kaydet
  await app.register(jwtPlugin);

  app.post('/users', userCtrl.registerUser);
  app.post('/login', userCtrl.loginUser);
  // burada app.authenticate eksiksiz çağrılıyor
  app.delete(
    '/users/:id',
    { preValidation: [app.authenticate] },
    userCtrl.deleteUser
  );
  app.get('/users', userCtrl.getUsers);
}
