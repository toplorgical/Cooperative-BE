import bcrypt from "bcryptjs";
import config from "../config/config";
import jwt from "jsonwebtoken";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const result = await bcrypt.hash(password, salt);
  return result;
};

export const comparePassword = async (password: string, hashed: string) => {
  return await bcrypt.compare(password, hashed);
};

export const generateToken = (
  userId: number,
  expiresIn: "1h" | "6h" | "12h" | "24h" | "7d" | "30d" | "60d" | "90d"
) => {
  return jwt.sign({ id: userId }, config.JWT_KEY, { expiresIn });
};

export function verifyToken(token: string) {
  return jwt.verify(token, config.JWT_KEY) as { id: string | number };
}

export const cookieProperties = {
  httpOnly: true,
  secure: true,
  maxAge: 1000 * 60 * 60 * 24 * 7,
  sameSite: "strict",
};

export const maxAge = {
  "1h": 1000 * 60 * 60,
  "6h": 1000 * 60 * 60 * 6,
  "12h": 1000 * 60 * 60 * 12,
  "24h": 1000 * 60 * 60 * 24,
  "7d": 1000 * 60 * 60 * 24 * 7,
  "30d": 1000 * 60 * 60 * 24 * 30,
  "60d": 1000 * 60 * 60 * 24 * 60,
  "90d": 1000 * 60 * 60 * 24 * 90,
};
