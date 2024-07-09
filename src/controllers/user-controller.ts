import { Request, Response } from "express";
import { UserProps } from "../types";
import UserService from "../services/user-service";
import { generateToken } from "../utils";
import ResponseManager from "../utils/response-manager";
import { promises } from "dns";

class UserController {
  static async signup(req: Request, res: Response) {
    const data = req.body as UserProps;
    const result = await UserService.signup(data);

    const token = generateToken(result.user.id, "7d");
    res.header("Authorization", "Bearer " + token);
    ResponseManager.success(res, result.user, 201);
  }

  static async signin(req : Request, res : Response){
    const data = req.body as UserProps;
    const user = await UserService.sigin(data) 
    ResponseManager.success(res, user, 200);

  }
}

export default UserController;
