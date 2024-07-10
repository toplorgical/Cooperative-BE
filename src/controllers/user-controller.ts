import { Request, Response } from "express";
import { UserProps } from "../types";
import UserService from "../services/user-service";
import { generateToken } from "../utils";
import ResponseManager from "../utils/response-manager";

class UserController {
  static async signup(req: Request, res: Response) {
    const data = req.body as UserProps;
    const result = await UserService.signup(data);

    const accessToken = generateToken(result.user, "7d");
    ResponseManager.success(res, { accessToken }, 201);

    UserService.requestOTP(result.user);
  }

  static async signin(req: Request, res: Response) {
    const data = req.body as UserProps;
    const result = await UserService.sigin(data);
    const accessToken = generateToken(result, "7d");
    ResponseManager.success(res, { accessToken }, 200);
  }

  static async requestOTP(req: Request, res: Response) {}

  static async verifyOTP(req: any, res: Response) {
    const user = req.user as UserProps;
    const result = await UserService.verifyOTP(req.body, user);
    ResponseManager.success(res, null, 200, result.message);
  }
  static async forgotPassword(req: any, res: Response) {
    const user = req.user as UserProps;
    const result = await UserService.forgotPassword(req.body, user);
  }
  static async resetPassword(req: Request, res: Response) {}
}

export default UserController;
