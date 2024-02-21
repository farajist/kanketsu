import express, { Express } from 'express';
import logger from 'morgan';
import cors from 'cors';
import { initErrorRoutes } from './modules/error/controllers/errors.controller';
import isAliveRouter from './modules/health/controllers/health.controller';
import urlsRouter from './modules/url/controllers/url.controller';
import env from './env';
import createDatabaseConnection from '@common/database';

export default function initApp(silent?: boolean): Express {
  const app = express();
  if (!silent) app.use(logger('dev'));
  if (env.cors) app.use(cors());

  createDatabaseConnection();

  app.use(express.json());
  app.use('/health', isAliveRouter());
  app.use('/url', urlsRouter());
  initErrorRoutes(app);
  return app;
}
