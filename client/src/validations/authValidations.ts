import parsePhoneNumberFromString from "libphonenumber-js";
import * as Yup from "yup";

class AuthValidation {
  static signin = Yup.object({
    password: Yup.string().min(6).required(),
    phone: Yup.string()
      .length(11)
      .test("is-valid-phone", "Invalid phone number", (value) => {
        if (!value) return false;
        const phoneNumber = parsePhoneNumberFromString(value, "NG");
        return phoneNumber ? phoneNumber.isValid() : false;
      })
      .required(),
  });

  static phone = Yup.object({
    phone: Yup.string()
      .length(11)
      .test("is-valid-phone", "Invalid phone number", (value) => {
        if (!value) return false;
        const phoneNumber = parsePhoneNumberFromString(value, "NG");
        return phoneNumber ? phoneNumber.isValid() : false;
      })
      .required(),
  });
  static signup = Yup.object({
    password: Yup.string().min(6).required().label("Password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password") as any], "Passwords do not match")
      .required()
      .label("Confirm Password"),
    firstName: Yup.string().min(2).required().label("First Name"),
    lastName: Yup.string().min(2).required().label("Last Name"),
    phone: Yup.string()
      .length(11)
      .test("is-valid-phone", "Invalid phone number", (value) => {
        if (!value) return false;
        const phoneNumber = parsePhoneNumberFromString(value, "NG");
        return phoneNumber ? phoneNumber.isValid() : false;
      })
      .required(),
  });

  static forgotPassword = Yup.object({
    phone: Yup.string()
      .length(11)
      .test("is-valid-phone", "Invalid phone number", (value) => {
        if (!value) return false;
        const phoneNumber = parsePhoneNumberFromString(value, "NG");
        return phoneNumber ? phoneNumber.isValid() : false;
      })
      .required(),
  });
  static verification = Yup.object({
    code: Yup.string().matches(/[0-9]/).min(6).required().label("Verification Code"),
  });
  static resetPassword = Yup.object({
    code: Yup.string().matches(/[0-9]/).min(6).required().label("Verification Code"),
    password: Yup.string().min(6).required(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password") as any], "Passwords do not match")
      .required()
      .label("Confirm Password"),
  });

  static changePassword = Yup.object({
    password: Yup.string().min(6).required(),
    newPassword: Yup.string().min(6).required(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword") as any], "Passwords do not match")
      .required()
      .label("Confirm Password"),
  });
}

export default AuthValidation;
