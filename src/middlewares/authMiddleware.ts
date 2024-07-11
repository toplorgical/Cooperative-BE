import { Response, NextFunction } from "express";
import { AuthorizationError, NotFoundError } from "../utils/errorHandler";
import { verifyToken } from "../utils";
import UserRepository from "../repository/user-repository";

const authenticationMiddleware = async (req: any, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) throw new AuthorizationError("No token provided");

  const result = verifyToken(token);
  const user = await UserRepository.findByPk(result?.id);
  if (!user) throw new NotFoundError("The requested user could not found");

  req.user = user;
  next();
};

export default authenticationMiddleware;
