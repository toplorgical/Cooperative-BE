// src/middleware/jwtMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

interface CustomRequest extends Request {
  user?: string | object;
}

const authenticationMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ error: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: "Invalid token." });
  }
};

export default authenticationMiddleware;
