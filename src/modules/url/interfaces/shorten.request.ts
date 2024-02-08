import { Request } from 'express';
import { UrlDTO } from './url.dto';

type ShortenReqDict = {};
type ShortenResBody = { url: string; hash: string };
type ShortenReqBody = UrlDTO;
type ShortenReqQuery = {};

export type ShortenRequest = Request<
  ShortenReqDict,
  ShortenResBody,
  ShortenReqBody,
  ShortenReqQuery
>;
