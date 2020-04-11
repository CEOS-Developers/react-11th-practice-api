import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';

import CandidateService from '../../services/candidate';
import { getLogger } from '../../loaders/dependencyInjector';

const route = Router();

export default (app: Router) => {
  app.use('/candidates', route);

  route.get('/', async (req: Request, res: Response) => {
    const logger = getLogger();
    logger.debug('Calling Candidate-List endpoint');
    const candidateServiceInstance = Container.get(CandidateService);
    const candidates = await candidateServiceInstance.List();
    return res.json(candidates).status(200);
  });

  route.post(
    '/',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = getLogger();
      logger.debug('Calling Candidate-Create endpoint with body: %o', req.body);
      try {
        const { name } = req.body;
        const candidateServiceInstance = Container.get(CandidateService);
        const { candidate } = await candidateServiceInstance.Create({ name });
        return res.json({ candidate }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.put('/:id/vote/', async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.debug('Calling Candidate-Vote endpoint');
    try {
      const { id } = req.params;
      const candidateServiceInstance = Container.get(CandidateService);
      await candidateServiceInstance.Vote(id);
      return res.json({ message: 'vote success' }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
