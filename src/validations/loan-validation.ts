import Joi from "joi";
import { LoanProps, LoanTypeProps, SendMailProps } from "../types";

class LoanValidations {
  static create(data: LoanProps) {
    const schema = Joi.object({
      amount: LoanValidations.loanProperties.amount,
      duration: LoanValidations.loanProperties.duration,
      userId: LoanValidations.loanProperties.userId,
      loanTypeId: LoanValidations.loanProperties.loanTypeId,
      guarantors: Joi.array()
        .max(2)
        .min(2)
        .items({
          registrationId: Joi.string().required().label("Membership ID"),
        }),
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
  static status(data: LoanProps) {
    const schema = Joi.object({
      id: Joi.number().integer().required().label("Loan ID"),
      status: Joi.string().valid("APPROVED", "REJECTED").required(),
    });

    const { error } = schema.validate(data);
    if (error) return error.details[0].message;
    return null;
  }

  static loanProperties = {
    amount: Joi.number().required().label("amount"),
    userId: Joi.number().integer().required().label("userId"),
    loanTypeId: Joi.number().integer().required().label("id"),
    duration: Joi.number().integer().required().label("duration"),
  };
 

  static message(data : SendMailProps) {
    const schema = Joi.object({
      usersQuery: {
      isVerified: Joi.boolean(),
      isActive : Joi.string(),
      isBanned : Joi.string(),
      content: Joi.string().required().label("content"),
    },
    data:{
      subject: Joi.string().required().label("message"),
      content: Joi.string().required().label("content"),
    },
    lonsQuery:{
      status: Joi.array()

    }
    } 
  );
    const { error } = schema.validate(data);
    if (error) return error.details[0].message;
    return null;
  }
  
}

export default LoanValidations;
