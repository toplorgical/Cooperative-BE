import _ from "lodash";
import moment from "moment";
import UserRepository from "../repository/user-repository";
import VerificationRepository from "../repository/verificationRepository";
import { ResetPasswordProps, UserProps, VerificationProps } from "../types";
import { hashPassword, comparePassword, generateOtp, isValidPhone, generateToken, verifyToken } from "../utils";
import { ApplicationError, ValidationError } from "../utils/errorHandler";
import UserValidations from "../validations/user-validations";
import { RESPONSE, smsResponse } from "../constants";
import { MessagingService, MassagingProps } from "./messaging-service";

class UserService {
  static async signup(data: UserProps) {
    const error = UserValidations.signup(data);
    if (error) throw new ValidationError(error, 400);
    if (!isValidPhone(data.phone)) throw new ValidationError(RESPONSE.INVALID_PHONE, 400);

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

  static async requestOTP(data: UserProps) {
    const user = await UserRepository.findOne({ phone: data.phone } as UserProps);
    if (!user) throw new ApplicationError(RESPONSE.USER_NOT_FOUND);

    const _data = {} as VerificationProps;
    _data.code = generateOtp(6);
    _data.userId = user.id;
    _data.expiresAt = moment().add(10, "minutes").format("YYYY-MM-DD HH:mm:ss");

    const message = smsResponse.message.replace("otp", _data.code);
    await VerificationRepository.create(_data);

    const _message = { to: [user.phone], sms: message } as MassagingProps;
    const result = await MessagingService.send(_message);
    if (result.status === "success") return { data: result.response };
    else throw new ApplicationError(RESPONSE.SMS_FAILED);
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

  static async forgotPassword(data: UserProps) {
    if (!isValidPhone(data.phone)) throw new ValidationError(RESPONSE.INVALID_PHONE, 400);

    const user = await UserRepository.findOne({ phone: data.phone });
    if (!user) throw new ApplicationError(RESPONSE.INVALID_CREDENTAILS, 400);

    const token = generateToken({ publicId: user.publicId }, "10m");
    await UserService.requestOTP(user);

    return { token };
  }

  static async resetPassword(data: ResetPasswordProps) {
    const error = UserValidations.resetPassword(data);
    if (error) throw new ValidationError(error, 400);

    const decoded = verifyToken(data.token);
    const publicId = "";
    console.log(decoded);

    const user = await UserRepository.findOne({ publicId });
    if (!user) throw new ApplicationError("Token is invalid or expired", 400);

    const _vQuery = { userId: user.id, code: data.code } as VerificationProps;
    const code = await VerificationRepository.findOne(_vQuery);
    if (!code) throw new ApplicationError(RESPONSE.OTP_EXPIRED);
    if (moment() > moment(code.expiresAt)) throw new ApplicationError(RESPONSE.OTP_EXPIRED);

    data.password = await hashPassword(data.password);
    await UserRepository.update({ password: data.password }, user.id);
    await VerificationRepository.destroy(_vQuery);

    return "Password reset successful";
  }
}
export default UserService;
