import { NextFunction, Request, Response } from 'express';

export function asyncRoute(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

export class ErrorWithStatus extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export function errWithStatus(
  message: string,
  status: number
): ErrorWithStatus {
  return new ErrorWithStatus(message, status);
}
