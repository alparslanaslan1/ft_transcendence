import { FastifyInstance } from 'fastify';
import jwtPlugin from '../plugins/jwt';
import {
  addFriendHandler, removeFriendHandler, listFriendsHandler
} from '../controllers/friendController';

export async function friendRoutes(app: FastifyInstance) {
  await app.register(jwtPlugin);

  app.post('/friends/:friendId',
    { preValidation: [app.authenticate] },
    addFriendHandler
  );

  app.delete('/friends/:friendId',
    { preValidation: [app.authenticate] },
    removeFriendHandler
  );

  app.get('/friends',
    { preValidation: [app.authenticate] },
    listFriendsHandler
  );
}
