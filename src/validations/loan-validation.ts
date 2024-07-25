import Joi from "joi";
import { LoanProps, LoanTypeProps } from "../types";

class LoanValidations {
  static create(data: LoanProps) {
    const schema = Joi.object({
      amount: LoanValidations.loanProperties.amount,
      duration: LoanValidations.loanProperties.duration,
      userId: LoanValidations.loanProperties.userId,
      loanTypeId: LoanValidations.loanProperties.loanTypeId,
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
    userId: Joi.number().required().label("userId"),
    loanTypeId: Joi.number().required().label("id"),
    duration: Joi.number().integer().required().label("duration"),
  };
}

export default LoanValidations;
