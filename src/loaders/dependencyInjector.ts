import { Container } from 'typedi';
import winston from 'winston';
import LoggerInstance from './logger';

export default ({ mongoConnection, models }: { mongoConnection; models: { name: string; model: any }[] }) => {
  try {
    models.forEach(m => {
      Container.set(m.name, m.model);
    });

    Container.set('logger', LoggerInstance);

    LoggerInstance.info('✌️ Agenda injected into container');

    return {};
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};

export const getLogger = () => Container.get<winston.Logger>('logger');
