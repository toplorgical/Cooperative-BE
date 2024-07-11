import { Response, NextFunction } from "express";
import { AuthorizationError } from "../utils/errorHandler";
import { verifyToken } from "../utils";

const authenticationMiddleware = (req: any, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) throw new AuthorizationError("No token provided");

  const result = verifyToken(token);
  req.user = result;
  next();
};

export default authenticationMiddleware;
