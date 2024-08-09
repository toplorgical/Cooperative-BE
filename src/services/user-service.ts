import _ from "lodash";
import moment from "moment";
import UserRepository from "../repository/user-repository";
import VerificationRepository from "../repository/verificationRepository";
import { ChangePasswordProps, ResetPasswordProps, UserProps, VerificationProps } from "../types";
import { hashPassword, comparePassword, generateOtp, generateRandomUUID } from "../utils";
import { ApplicationError, NotFoundError, ValidationError } from "../utils/errorHandler";
import UserValidations from "../validations/user-validations";
import { RESPONSE, smsResponse } from "../constants";
import { MessagingService, MassagingProps } from "./messaging-service";
import UserEventEmitter from "../event/user-event-emitter";
import JWTManager from "../manager/jwtManager";

class UserService {
  static async signup(data: UserProps) {
    const error = UserValidations.signup(data);
    if (error) throw new ValidationError(error, 400);

    let user = await UserRepository.findOne({ phone: data.phone } as UserProps);
    if (user) throw new ApplicationError(RESPONSE.USER_EXIST, 400);

    data.password = await hashPassword(data.password);
    user = await UserRepository.create(data);
    user = _.omit(user, ["password"]) as UserProps;

    const accessToken = JWTManager.generate(user.id, "7d");
    UserEventEmitter.emit("REQUEST_OTP", user);
    return { accessToken };
  }

  static async sigin(data: UserProps) {
    const error = UserValidations.signin(data);
    if (error) throw new ValidationError(error, 400);
    let user = await UserRepository.findOne({ phone: data.phone } as UserProps);
    if (!user) throw new ApplicationError(RESPONSE.INVALID_CREDENTAILS, 400);

    const isValidPassword = await comparePassword(data.password, user.password);
    if (!isValidPassword) throw new ApplicationError(RESPONSE.INVALID_CREDENTAILS, 400);

    user = _.omit(user, ["password"]) as UserProps;
    const accessToken = JWTManager.generate(user.id, "7d");
    return { accessToken };
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
    const user = await UserRepository.findOne({ phone: data.phone });
    if (!user) throw new ApplicationError(RESPONSE.INVALID_CREDENTAILS, 400);

    const publicId = generateRandomUUID();
    await UserRepository.update({ publicId }, user.id);
    const accessToken = JWTManager.generate(publicId, "10m");
    UserEventEmitter.emit("REQUEST_OTP", user);
    return { token: accessToken };
  }

  static async resetPassword(data: ResetPasswordProps) {
    const error = UserValidations.resetPassword(data);
    if (error) throw new ValidationError(error, 400);

    const publicId = JWTManager.verify(data.token)?.id;
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

  static async personalInfo(data: UserProps, user: UserProps) {
    const error = UserValidations.personalInfo(data);
    if (error) throw new ValidationError(error, 400);

    if (user.profileSetup === "PERSONAL_INFO") data.profileSetup = "WORK_INFO";
    await UserRepository.update(data, user.id);
    return "Personal info updated successfully";
  }

  static async workInfo(data: UserProps, user: UserProps) {
    const error = UserValidations.workInfo(data);
    if (error) throw new ValidationError(error, 400);

    if (user.profileSetup === "WORK_INFO") data.profileSetup = "COMPLETED";
    await UserRepository.update(data, user.id);
    return "Work info updated successfully";
  }

  static async changePassword(data: ChangePasswordProps, user: UserProps) {
    const error = UserValidations.changePassword(data);
    if (error) throw new ValidationError(error, 400);

    const isValidPassword = await comparePassword(data.password, user.password);
    if (!isValidPassword) throw new ApplicationError("Current password is invalid");

    data.password = await hashPassword(data.newPassword);
    await UserRepository.update({ password: data.password }, user.id);
    return "Password updated successfully";
  }

  static async changePhone(data: UserProps, user: UserProps) {
    const error = UserValidations.phoneNumber(data);
    if (error) throw new ValidationError(error, 400);

    const isExist = await UserRepository.findOne({ phone: data.phone });
    if (isExist) throw new ApplicationError("Phone number already exist");

    await UserRepository.update({ phone: data.phone, isVerified: false }, user.id);
    UserEventEmitter.emit("REQUEST_OTP", { ...user, phone: data.phone });
    return "Phone updated successfully";
  }

  static async changeRole(data: UserProps) {
    const error = UserValidations.role(data);
    if (error) throw new ValidationError(error, 400);

    const user = await UserRepository.findByPk(data.userId);
    if (!user) throw new NotFoundError("The requested user could not be found");

    await UserRepository.update(data, user.id);
    return "User role updated successfully";
  }
}
export default UserService;
