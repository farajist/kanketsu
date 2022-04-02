import { ERROR_MISSING_REQUIRED_PARAMS } from 'modules/url/constants';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { asyncRoute, errWithStatus } from '../../../utils/routes';
import { UrlDTO } from '../dtos/url.dto';
import urlService from '../services/url.service';

async function shorten(req: Request, res: Response) {
  const urlData = req.query as UrlDTO;

  try {
    const urlPayload = await urlService.set(urlData, {});
    res.status(StatusCodes.CREATED).json(urlPayload);
  } catch (error) {
    throw errWithStatus(ERROR_MISSING_REQUIRED_PARAMS, StatusCodes.BAD_REQUEST);
  }
}

async function expand(req: Request, res: Response) {
  const { hash } = req.params as ExpandURLParams;
  try {
    const longUrl = await urlService.get(hash);
    res.status(StatusCodes.OK).json(longUrl);
  } catch (error) {
    throw errWithStatus('Not found', StatusCodes.NOT_FOUND);
  }
}

export default function urlRouter(): Router {
  const router = Router();
  router.get('/shorten', asyncRoute(shorten));
  router.post('/expand', asyncRoute(expand));
  return router;
}
