import { FastifyInstance } from 'fastify';
import * as userCtrl from '../controllers/userController';

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', userCtrl.registerUser);
  app.post('/login', userCtrl.loginUser);
  app.delete(
    '/users/:id',
    { preValidation: [app.authenticate] },
    userCtrl.deleteUser
  );
  app.get(
    '/users',
    //{ preValidation: [app.authenticate] },
    userCtrl.getUsers
  );
}
