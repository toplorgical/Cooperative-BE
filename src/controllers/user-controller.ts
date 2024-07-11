import { Request, Response } from "express";
import { ResetPasswordProps, UserProps } from "../types";
import UserService from "../services/user-service";
import { generateToken } from "../utils";
import ResponseManager from "../utils/response-manager";
import _ from "lodash";

class UserController {
  static async signup(req: Request, res: Response) {
    const data = req.body as UserProps;
    const result = await UserService.signup(data);

    const accessToken = generateToken(result.user.id, "7d");
    ResponseManager.success(res, { accessToken }, 201);
    UserService.requestOTP(result.user);
  }

  static async signin(req: Request, res: Response) {
    const data = req.body as UserProps;
    const result = await UserService.sigin(data);
    const accessToken = generateToken(result.user.id, "7d");
    ResponseManager.success(res, { accessToken }, 200);
  }

  static async requestOTP(req: any, res: Response) {
    const data = req.user as UserProps;

    const otpResponse = await UserService.requestOTP(data);
    ResponseManager.success(res, null, 200, otpResponse.data);
  }

  static async verifyOTP(req: any, res: Response) {
    const user = req.user as UserProps;
    const result = await UserService.verifyOTP(req.body, user);
    ResponseManager.success(res, null, 200, result.message);
  }

  static async forgotPassword(req: any, res: Response) {
    const result = await UserService.forgotPassword(req.body);
    ResponseManager.success(res, result, 200);
  }

  static async resetPassword(req: any, res: any) {
    const data = req.body as ResetPasswordProps;
    const message = await UserService.resetPassword(data);
    ResponseManager.success(res, null, 200, message);
  }

  static async changePassword(req: any, res: any) {
    const data = req.body as UserProps;
    const user = req.user as UserProps;
    const message = await UserService.changePassword(data, user);
    ResponseManager.success(res, null, 200, message);
  }

  static async getUser(req: any, res: any) {
    const user = _.omit(req.user, ["password"]) as UserProps;
    ResponseManager.success(res, user, 200);
  }

  static async personalInfo(req: any, res: any) {
    const user = req.user as UserProps;
    await UserService.personalInfo(req.body, user);
    ResponseManager.success(res, user, 200);
  }

  static async workInfo(req: any, res: any) {
    const user = req.user as UserProps;
    await UserService.workInfo(req.body, user);
    ResponseManager.success(res, user, 200);
  }
}

export default UserController;
