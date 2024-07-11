import { NextFunction, Request, Response } from "express";
import ResponseManager from "./response-manager";

export class ApplicationError extends Error {
  constructor(public message: string, public statusCode?: number) {
    super(message);
    this.name = "ApplicationError";
    this.statusCode = statusCode || 400;
  }
}
export class ValidationError extends ApplicationError {
  constructor(public message: string, public statusCode?: number) {
    super(message);
    this.statusCode = 400;
    this.name = "ValidationError";
  }
}
export class NotFoundError extends ApplicationError {
  constructor(public message: string, public statusCode?: number) {
    super(message);
    this.statusCode = 404;
    this.name = "NotFoundError";
  }
}

export class AuthorizationError extends ApplicationError {
  constructor(public message: string, public statusCode?: number) {
    super(message);
    this.statusCode = 401;
    this.name = "AuthorizationError";
  }
}

function errorHandler(err: ApplicationError, req: Request, res: Response, next: NextFunction) {
  if (err.statusCode) ResponseManager.error(res, err.name, err.message, err.statusCode);
  else ResponseManager.error(res, err.name, err.message, 500);
  if (!err.statusCode || err.statusCode >= 500) console.log(err, req);
}

export default errorHandler;
