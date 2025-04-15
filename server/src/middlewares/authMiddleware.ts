import { Response, NextFunction } from "express";
import { AuthorizationError, NotFoundError } from "../utils/errorHandler";
import UserRepository from "../repository/user-repository";
import JWTManager from "../manager/jwtManager";

const authenticationMiddleware = async (req: any, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) throw new AuthorizationError("No token provided");

  const result = JWTManager.verify(token);
  const user = await UserRepository.findByPk(result?.id);
  if (!user) throw new NotFoundError("The requested user could not found");

  req.user = user;
  next();
};

export default authenticationMiddleware;
