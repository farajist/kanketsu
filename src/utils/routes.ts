import { NextFunction, Request, Response } from 'express';

function asyncRoute(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

export default asyncRoute;
