import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import candidate from './routes/candidate';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app);
  user(app);
  candidate(app);

  return app;
};
