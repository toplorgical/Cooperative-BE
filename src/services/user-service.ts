import _ from "lodash";
import moment from "moment";
import UserRepository from "../repository/user-repository";
import VerificationRepository from "../repository/verificationRepository";
import { UserProps, VerificationProps } from "../types";
import { hashPassword, comparePassword, generateOtp } from "../utils";
import { ApplicationError, ValidationError } from "../utils/errorHandler";
import UserValidations from "../validations/user-validations";
import { RESPONSE, smsResponse } from "../constants";
import {MessagingService, MassagingProps} from "./messaging-service";

class UserService {
  static async signup(data: UserProps) {
    const error = UserValidations.signup(data);
    if (error) throw new ValidationError(error, 400);

    let user = await UserRepository.findOne({ phone: data.phone } as UserProps);
    if (user) throw new ApplicationError(RESPONSE.USER_EXIST, 400);

    data.password = await hashPassword(data.password);
    user = await UserRepository.create(data);
    user = _.omit(user, ["password"]) as UserProps;
    return { user };
  }

  static async sigin(data: UserProps) {
    const error = UserValidations.signin(data);
    if (error) throw new ValidationError(error, 400);

    let user = await UserRepository.findOne({ phone: data.phone } as UserProps);
    if (!user) throw new ApplicationError(RESPONSE.INVALID_CREDENTAILS, 400);

    const isPasswordCorrect = await comparePassword(data.password, user.password);
    if (!isPasswordCorrect) throw new ApplicationError(RESPONSE.INVALID_CREDENTAILS, 400);

    user = _.omit(user, ["password"]) as UserProps;
    return { user };
  }

  static async verifyOTP(data: { code: string }, user: UserProps) {
    if (user.isVerified) throw new ApplicationError(RESPONSE.USER_VERIFIED, 400);

    const error = UserValidations.verification(data);
    if (error) throw new ValidationError(error, 400);

    const code = await VerificationRepository.findOne({ code: data.code, userId: user.id });
    if (!code) throw new ApplicationError(RESPONSE.OTP_EXPIRED, 400);
    if (moment() > moment(code.expiresAt)) throw new ApplicationError(RESPONSE.OTP_EXPIRED, 400);

    const _userPayload = { isVerified: true } as UserProps;
    await UserRepository.update(_userPayload, user.id);
    return { message: "Account verification successful." };
  }

  static async requestOTP(data: UserProps) {
    const user = await UserRepository.findOne({ phone: data.phone } as UserProps);
    if (!user) throw new ApplicationError(RESPONSE.USER_NOT_FOUND);
    const code = generateOtp(6);
    let optInfo: VerificationProps = {
      code: code,
      userId: user.id,
      expiresAt: moment().add(10, "minutes").format("YYYY-MM-DD HH:mm:ss"),
    };
    const message = smsResponse.message.replace("code", code)
    const verificationRepo = VerificationRepository.create(optInfo)
    
    const sendSms = await MessagingService.send({ to: [user.phone], sms: message } as MassagingProps)


    



  }
  static async verification(req: Request, res: Response) {}
  static async forgotPassword(req: Request, res: Response) {}
  static async resetPassword(req: Request, res: Response) {}
}
export default UserService;
