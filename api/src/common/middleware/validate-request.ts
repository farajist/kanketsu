import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationErrorItem, Schema } from 'joi';

class ErrorWithStatus extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

class ValidationError extends ErrorWithStatus {
  errors: Record<string, [string]>;
  constructor(message: string, errs: Record<string, [string]>) {
    super(message, StatusCodes.BAD_REQUEST);
    this.name = 'ValidationError';
    this.errors = errs;
  }
}

function errWithValidation(
  errs: Record<string, [string]>,
  message = 'Validation failed'
) {
  return new ValidationError(message, errs);
}

function validateRequestSchema(
  req: Request,
  next: NextFunction,
  schema: Schema
) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  const { error, value } = schema.validate(req.body, options);
  if (error) {
    const errors = error.details.reduce(
      (acc: Record<string, [string]>, item: ValidationErrorItem) => {
        acc = { ...acc, [item?.context?.label as string]: [item.message] };
        return acc;
      },
      {}
    );
    next(errWithValidation(errors));
  } else {
    req.body = value;
    next();
  }
}

function validateRequest(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    validateRequestSchema(req, next, schema);
  };
}

export default validateRequest;
