import { Express } from 'express';
import * as express from 'express';
import * as logger from 'morgan';
import * as cors from 'cors';
import { isAliveRouter } from './controllers/isalive/isalive.route';
import env from './environment/env';
import { initErrorRoutes } from './controllers/error/error.route';

const consoleStamp = require('console-stamp');

export default function initApp(silent?: boolean): Express {
  const app = express();
  consoleStamp(console, {});
  if (!silent) {
    app.use(logger('dev'));
  }
  if (env.cors) {
    app.use(cors());
  }

  app.use(express.json());
  app.use('/', isAliveRouter());
  initErrorRoutes(app);
  return app;
}
