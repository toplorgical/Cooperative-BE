import Joi from "joi";
import { LoanProps } from "../types";


class LoanValidations {
  

  static validate(data: LoanProps) {
    const schema = Joi.object({
      amount: LoanValidations.loanProperties.amount,
      duration: LoanValidations.loanProperties.duration,
    });

    const { error } = schema.validate(data);
    if (error) return error.details[0].message;
    return null;
  }


  static loanProperties = {
    amount: Joi.string().regex(/^\d+(\.\d{1,2})?$/).required().label("amount"),
    duration: Joi.string().regex(/^[0-9]$/).required().label("duration"),
   
  };
}

export default LoanValidations;
