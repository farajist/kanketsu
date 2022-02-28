import { Request, Response, Router } from 'express';
import asyncRoute from '../../utils/routes';

export interface IsAliveResp {
    isAlive: boolean;
}

async function isAlive(req: Request, res: Response) {
  // fake it
  const resBody : IsAliveResp = await Promise.resolve({ isAlive: true });
  res.json(resBody);
}

export function isAliveRouter(): Router {
  const router = Router();
  router.get('/', asyncRoute(isAlive));
  router.post('/', asyncRoute(isAlive));
  return router;
}
