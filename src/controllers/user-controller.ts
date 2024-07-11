import { Request, Response } from "express";
import { ResetPasswordProps, UserProps } from "../types";
import UserService from "../services/user-service";
import ResponseManager from "../utils/response-manager";
import _ from "lodash";
import UserRepository from "../repository/user-repository";

class UserController {
  static async signup(req: Request, res: Response) {
    const data = req.body as UserProps;
    const accessToken = await UserService.signup(data);
    ResponseManager.success(res, { accessToken }, 201);
  }

  static async signin(req: Request, res: Response) {
    const data = req.body as UserProps;
    const accessToken = await UserService.sigin(data);
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

  static async findUsers(req: any, res: any) {
    const query = { ...req.query };
    if (req.user) query.userId = req.user.id;

    const result = UserRepository.findAll(query);
    ResponseManager.success(res, result, 200);
  }
}

export default UserController;
