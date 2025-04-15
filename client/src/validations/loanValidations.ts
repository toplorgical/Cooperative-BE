import * as Yup from "yup";

class LoanValidation {
  static create = Yup.object({
    amount: Yup.number().required(),
    duration: Yup.number().integer().max(60).required(),
    loanTypeId: Yup.number().integer().required().label("Loan Type"),
    guarantors: Yup.array(
      Yup.object({
        registrationId: Yup.string().required().label("Guarantor membership ID"),
      })
    ),
  });
}

export default LoanValidation;
