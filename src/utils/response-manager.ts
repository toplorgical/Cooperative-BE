import { Response } from "express";

class ResponseManager {
  static success(res: Response, data: any, statusCode: number, message?: string) {
    res.status(statusCode).send({
      data,
      message,
      statusCode,
    });
  }
  static error(res: Response, name: string, message: string, statusCode: number = 500) {
    res.status(statusCode).send({
      name,
      message,
      statusCode,
    });
  }

  static cookie(
    res: Response,
    name: string,
    value: string,
    maxAge: number,
    sameSite: "strict" | "lax" | "none" = "strict",
    httpOnly: boolean = true,
    secure: boolean = true
  ) {
    return res.cookie(name, value, {
      httpOnly: httpOnly,
      secure: secure,
      maxAge: maxAge,
      sameSite: sameSite,
    });
  }
}

export default ResponseManager;
