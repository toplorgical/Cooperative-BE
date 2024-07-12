import _ from "lodash";
import { LoanProps, LoanTypeProps } from "../types/index";
import { ApplicationError, LoanRequestError, NotFoundError, ValidationError } from "../utils/errorHandler";
import LoanValidations from "../validations/loan-validation";
import { RESPONSE } from "../constants/index";
import LoanRepository from "../repository/loan-repository";
import UserRepository from "../repository/user-repository";
import LoanTypeRepository from "../repository/loan-type-repository";

class LoanServices {
  static async create(data: LoanProps) {
    const validate = LoanValidations.validate(data);
    if (validate) throw new ValidationError(RESPONSE.INVALID_CREDENTAILS);

    const getUserDetails = await UserRepository.findByPk(data.userId);
    if (getUserDetails.balance < data.amount / 2 && getUserDetails.registrationStatus !== "APPROVED")
      throw new LoanRequestError(RESPONSE.NOT_ELIGIBLE_FOR_LOAN);

    const loanDetails = await LoanRepository.create(data);

    return loanDetails;
  }

  static async cancel(id: number, userId: number) {
    const loan = await LoanRepository.findOne({ id, userId });
    if (!loan) throw new NotFoundError("The requested loan could not be found");
    if (loan.status !== "PENDING") throw new ApplicationError("Request could not be completed as loan is not pending");

    const data = { status: "CANCELED" } as LoanProps;
    const result = await LoanRepository.updateById(data, id);
    return { result, message: "Loan cancelled successfully" };
  }

  static async createLoanType(data: LoanTypeProps) {
    const error = LoanValidations.loanType(data);
    if (error) throw new ValidationError(error);

    const loanType = await LoanTypeRepository.findOne({ name: data.name });
    if (loanType) throw new ApplicationError(`Loan type (${data.name}) already exist`);

    const result = await LoanTypeRepository.create(data);
    return result;
  }

  static async updateLoanType(data: LoanTypeProps, id: number) {
    const error = LoanValidations.loanType(data);
    if (error) throw new ValidationError(error);

    const loanType = await LoanTypeRepository.findOne({ id });
    if (!loanType) throw new NotFoundError("The requested loan could not be found");

    const result = await LoanTypeRepository.update(data, id);
    return result;
  }

  static async deleteLoanType(id: number) {
    const loanType = await LoanTypeRepository.findOne({ id });
    if (!loanType) throw new NotFoundError("The requested loan could not be found");

    await LoanTypeRepository.deleteOne(id);
    return { message: "Loan type deleted successfully" };
  }
}

export default LoanServices;
