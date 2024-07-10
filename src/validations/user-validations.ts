import Joi from "joi";
import { UserProps } from "../types";

class UserValidations {
  static signup(data: UserProps) {
    const schema = Joi.object({
      firstName: UserValidations.userProperties.firstName,
      lastName: UserValidations.userProperties.lastName,
      password: UserValidations.userProperties.password,
      phone: UserValidations.userProperties.phone,
    });
    const { error } = schema.validate(data);
    if (error) return error.details[0].message;
    return null;
  }

  static signin(data: UserProps) {
    const schema = Joi.object({
      phone: UserValidations.userProperties.phone,
      password: UserValidations.userProperties.password,
    });

    const { error } = schema.validate(data);
    if (error) return error.details[0].message;
    return null;
  }
  static verification(data: { code: number }) {
    const schema = Joi.object({
      code: UserValidations.userProperties.code,
    });

    const { error } = schema.validate(data);
    if (error) return error.details[0].message;
    return null;
  }

  static userProperties = {
    firstName: Joi.string().regex(new RegExp("^[a-zA-Z]")).required().max(55).label("First Name"),
    lastName: Joi.string().regex(new RegExp("^[a-zA-Z]")).required().max(55).label("Last Name"),
    email: Joi.string().email().required().max(255).label("Email"),
    password: Joi.string().required().max(55).label("Password"),
    phone: Joi.string().required().max(14).label("Phone"),
    code: Joi.number().integer().required().label("Verification Code"),
  };
}

export default UserValidations;
