import { Request, Response } from "express";
import { UserProps } from "../types";
import UserService from "../services/user-service";
import { generateToken } from "../utils";
import ResponseManager from "../utils/response-manager";

class UserController {
  static async signup(req: Request, res: Response) {
    const data = req.body as UserProps;
    const result = await UserService.signup(data);

    const token = generateToken(result.user, "7d");
    res.header("Authorization", "Bearer " + token);
    ResponseManager.success(res, result.user, 201);
  }

  static async signin(req: Request, res: Response) {
    const data = req.body as UserProps;
    const result = await UserService.sigin(data);
    const token: string = generateToken(result, "7d");
    ResponseManager.success(res,  token, 200);
  }
  static async requestOTP(req: Request, res: Response) {}
  static async verification(req: Request, res: Response) {}
  static async forgotPassword(req: Request, res: Response) {}
  static async resetPassword(req: Request, res: Response) {}
}

export default UserController;
