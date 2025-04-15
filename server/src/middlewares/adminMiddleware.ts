import { Response, NextFunction } from "express";
import { ApplicationError, NotFoundError } from "../utils/errorHandler";
import { UserProps } from "../types";

const administratorMiddleware = async (req: any, res: Response, next: NextFunction) => {
  const user = req.user as UserProps;

  if (!user) throw new NotFoundError("Requested user could not be found.");
  if (!user.role.includes("ADMIN")) {
    throw new ApplicationError("You don't have the permission to access this resource", 403);
  }

  req.admin = user;
  req.user = undefined;
  next();
};

export default administratorMiddleware;
