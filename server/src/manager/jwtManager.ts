import jwt from "jsonwebtoken";
import config from "../config/config";
import { ApplicationError } from "../utils/errorHandler";

type ExpiresInProps = "10m" | "1h" | "6h" | "12h" | "24h" | "7d" | "30d" | "60d" | "90d";

class JWTManager {
  static tokens = {} as { [key: string]: string };
  static revoke(data: string | number) {
    delete JWTManager.tokens[data];
  }

  static generate(data: string | number, expiresIn: ExpiresInProps) {
    const result = jwt.sign({ id: data }, config.JWT_KEY, { expiresIn });
    JWTManager.tokens[data] = result;
    return result;
  }

  static verify(token: string) {
    try {
      const result = jwt.verify(token, config.JWT_KEY) as any;
      return result;
    } catch (error) {
      throw new ApplicationError("Token is invalid or expired");
    }
  }
}

export default JWTManager;
