import Joi from "joi";
import { LoanProps, LoanTypeProps } from "../types";

class LoanValidations {
  static validate(data: LoanProps) {
    const schema = Joi.object({
      amount: LoanValidations.loanProperties.amount,
      duration: LoanValidations.loanProperties.duration,
      userId: LoanValidations.loanProperties.userId,
    });

    const { error } = schema.validate(data);
    if (error) return error.details[0].message;
    return null;
  }
  static loanType(data: LoanTypeProps) {
    const schema = Joi.object({
      name: Joi.string().required(),
      rate: Joi.number().required(),
    });

    const { error } = schema.validate(data);
    if (error) return error.details[0].message;
    return null;
  }

  static loanProperties = {
    amount: Joi.number().required().label("amount"),
    userId: Joi.number().integer().required().label("userId"),
    duration: Joi.string()
      .regex(/^[0-9]$/)
      .required()
      .label("duration"),
  };
}

export default LoanValidations;
