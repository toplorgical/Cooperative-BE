import { Response, NextFunction } from "express";
import { AuthorizationError, NotFoundError } from "../utils/errorHandler";
import JWTManager from "../manager/jwtManager";
import { UserProps } from "../types";

const administratorMiddleware = async (req: any, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) throw new AuthorizationError("No token provided");

  const result = JWTManager.verify(token);
  const admin = {} as UserProps;
  req.admin = admin;
  next();
};

export default administratorMiddleware;
