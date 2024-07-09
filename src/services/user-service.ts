import _ from "lodash";
import UserRepository from "../repository/user-repository";
import { UserProps } from "../types";
import { hashPassword } from "../utils";
import { ApplicationError } from "../utils/errorHandler";
import UserValidations from "../validations/user-validations";

class UserService {
  static async signup(data: UserProps) {
    const error = UserValidations.signup(data);
    if (error) throw new ApplicationError(error);

    let user = await UserRepository.findOne({ phone: data.phone } as UserProps);
    if (user) throw new ApplicationError("User already exist");

    data.password = await hashPassword(data.password);
    user = await UserRepository.create(data);
    user = _.omit(user, ["password"]) as UserProps;
    return { user };
  }
}

export default UserService;
