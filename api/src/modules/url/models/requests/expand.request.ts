import { Request } from 'express';

type ExpandReqDict = { hash?: string };
type ExpandResBody = {};
type ExpandReqBody = {};
type ExpandReqQuery = {};

export type ExpandRequest = Request<
  ExpandReqDict,
  ExpandResBody,
  ExpandReqBody,
  ExpandReqQuery
>;
