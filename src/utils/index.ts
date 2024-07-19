import bcrypt from "bcryptjs";
import crypto from "crypto";
import generateUniqueId from "generate-unique-id";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const result = await bcrypt.hash(password, salt);
  return result;
};

export const comparePassword = async (password: string, hashed: string) => {
  return await bcrypt.compare(password, hashed);
};

export function generateRandomUUID() {
  return crypto.randomUUID();
}

export function generateId(length: number, useLetters: boolean = false) {
  return generateUniqueId({ length, useLetters });
}

export const generateOtp = (length: number) => {
  let digits = "";
  for (let i = 0; i < length; i++) {
    digits += Math.floor(Math.random() * 10);
  }
  return digits;
};
