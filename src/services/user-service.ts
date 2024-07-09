import _ from "lodash";
import UserRepository from "../repository/user-repository";
import { UserProps } from "../types";
import { hashPassword, comparePassword } from "../utils";
import { ApplicationError, ValidationError } from "../utils/errorHandler";
import UserValidations from "../validations/user-validations";
import { RESPONSE } from "../constants";

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
}
export default UserService;
