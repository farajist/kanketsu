import { Request, Response, Router } from 'express';
import { asyncRoute } from '../../../utils/routes';
import { IsAliveResp } from '../dtos/isalive-response.dto';

async function isAlive(req: Request, res: Response) {
  // fake it
  const resBody: IsAliveResp = await Promise.resolve({ isAlive: true });
  res.json(resBody);
}

export default function isAliveRouter(): Router {
  const router = Router();
  router.get('/', asyncRoute(isAlive));
  router.post('/', asyncRoute(isAlive));
  return router;
}
