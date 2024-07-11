import Joi from "joi";
import { ResetPasswordProps, UserProps } from "../types";

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

  static personalInfo(data: UserProps) {
    const schema = Joi.object({
      firstName: Joi.string().regex(new RegExp("^[a-zA-Z]")).required().label("First Name"),
      lastName: Joi.string().regex(new RegExp("^[a-zA-Z]")).required().label("Last Name"),
      middleName: Joi.string().regex(new RegExp("^[a-zA-Z]")).required().label("Middle Name"),
      email: Joi.string().email().label("Email"),
      nationality: Joi.string().required().label("Nationality"),
      country: Joi.string().required().valid("Nigeria").label("Country"),
      state: Joi.string().required().label("State"),
      lga: Joi.string().required().label("LGA"),
      contactAddress: Joi.string().required().label("Address"),
      postalCode: Joi.string().label("Postal Code"),
      dateOfBirth: Joi.date().required().label("Date of Birth"),
      gender: Joi.string().required().label("Gender"),
    });
    const { error } = schema.validate(data);
    if (error) return error.details[0].message;
    return null;
  }
  static workInfo(data: UserProps) {
    const schema = Joi.object({
      companyName: Joi.string().required().label("Company Name"),
      jobTitle: Joi.string().required().label("Job Title"),
      employmentStartDate: Joi.date().required().label("Employment State Date"),
      employmentType: Joi.date().required().label("Employment Type"),
      employmentLocation: Joi.date().required().label("Employment Location"),
    });
    const { error } = schema.validate(data);
    if (error) return error.details[0].message;
    return null;
  }
  static changePassword(data: UserProps) {
    const schema = Joi.object({
      password: UserValidations.userProperties.password,
      newPassword: UserValidations.userProperties.password,
    });
    const { error } = schema.validate(data);
    if (error) return error.details[0].message;
    return null;
  }

  static verification(data: { code: string }) {
    const schema = Joi.object({
      code: UserValidations.userProperties.code,
    });

    const { error } = schema.validate(data);
    if (error) return error.details[0].message;
    return null;
  }

  static resetPassword(data: ResetPasswordProps) {
    const schema = Joi.object({
      code: UserValidations.userProperties.code,
      token: UserValidations.userProperties.token,
      password: UserValidations.userProperties.password,
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
    token: Joi.string().required().label("Token"),
  };
}

export default UserValidations;
