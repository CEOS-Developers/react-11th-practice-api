import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
import { UserModel } from '../../models';
const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.get(
    '/me',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    (req: Request & { currentUser: UserModel }, res: Response) => {
      return res.json({ user: req.currentUser }).status(200);
    },
  );
};
