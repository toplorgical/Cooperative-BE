import bcrypt from "bcryptjs";
import config from "../config/config";
import jwt from "jsonwebtoken";
import { phone } from "phone";
import crypto from "crypto";
import { ApplicationError } from "./errorHandler";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const result = await bcrypt.hash(password, salt);
  return result;
};

export const comparePassword = async (password: string, hashed: string) => {
  return await bcrypt.compare(password, hashed);
};

export function isValidPhone(phoneNumber: string) {
  return phone(phoneNumber, { country: "NG" }).isValid;
}

export function generateRandomUUID() {
  return crypto.randomUUID();
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

export const generateOtp = (length: number) => {
  let digits = "";
  for (let i = 0; i < length; i++) {
    digits += Math.floor(Math.random() * 10);
  }
  return digits;
};
