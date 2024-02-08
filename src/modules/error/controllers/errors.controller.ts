import { Application, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export interface ErrorResponse {
  status: number;
  error: string;
  code?: number;
  name?: string;
}

export function initErrorRoutes(app: Application): void {
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    let e = err;
    // axios response error
    if (e && e.response && e.response.data) {
      e = e.response.data;
    }
    const status =
      (e && (e.status || e.statusCode)) || StatusCodes.INTERNAL_SERVER_ERROR;
    const error =
      e && (e.message || (e.error && e.error.toString()) || e.toString());
    const code = e && e.code;
    const resBody: ErrorResponse = {
      status,
      error,
      code,
      name: e.name,
    };
    res.status(status).json(resBody);
  });
}
