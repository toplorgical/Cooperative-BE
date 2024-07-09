import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT || 8000,
  JWT_KEY: process.env.JWT_KEY as string,
  DATABASE: {
    URL: process.env.DATABASE_URL,
    PORT: process.env.DATABASE_PORT,
    PASSWORD: process.env.DATABASE_PASSWORD,
  },
} as const;

export default config;
