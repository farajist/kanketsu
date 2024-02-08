import { Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { asyncRoute, errWithStatus } from '@utils/routes';
import { ERROR_MISSING_REQUIRED_PARAMS } from '../constants';
import urlService from '../services/url.service';
import { ExpandRequest } from '../interfaces/expand.request';
import { ShortenRequest } from '../interfaces/shorten.request';
import shortenSchema from '../schema/shorten-url.schema';
import validateRequest from '@common/middleware/validate-request';

async function shorten(req: ShortenRequest, res: Response) {
  const urlData = req.body;
  try {
    const urlPayload = await urlService.set(urlData);
    res.status(StatusCodes.CREATED).json(urlPayload);
  } catch (error) {
    throw errWithStatus(ERROR_MISSING_REQUIRED_PARAMS, StatusCodes.BAD_REQUEST);
  }
}

async function expand(req: ExpandRequest, res: Response) {
  const { hash } = req.params;
  if (!hash)
    throw errWithStatus(ERROR_MISSING_REQUIRED_PARAMS, StatusCodes.BAD_REQUEST);
  try {
    const longUrl = await urlService.get(hash);
    res.status(StatusCodes.OK).json(longUrl);
  } catch (error) {
    throw errWithStatus('Not found', StatusCodes.NOT_FOUND);
  }
}

export default function urlRouter(): Router {
  const router = Router();
  router.post('/shorten', validateRequest(shortenSchema), asyncRoute(shorten));
  router.post('/expand', asyncRoute(expand));
  return router;
}
