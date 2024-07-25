import _ from "lodash";
import { LoanProps, LoanQueryProps, LoanTypeProps, UserProps } from "../types/index";
import { ApplicationError, NotFoundError, ValidationError } from "../utils/errorHandler";
import LoanValidations from "../validations/loan-validation";
import LoanRepository from "../repository/loan-repository";
import LoanTypeRepository from "../repository/loan-type-repository";

class LoanServices {
  static async create(data: LoanProps, user: UserProps) {
    const error = LoanValidations.create(data);
    if (error) throw new ValidationError(error);

    const loanType = await LoanTypeRepository.findOne({ id: data.loanTypeId });
    if (!loanType) throw new ApplicationError(`Loan type is invalid`);

    await LoanServices.checkLoanEligibility(user, data);

    const total = LoanServices.calculateLoan({ ...data, rate: loanType.rate });
    data.rate = loanType.rate;
    data.totalInterest = total.totalInterest;
    data.totalRepayments = total.totalRepayments;
    data.monthlyRepayment = total.monthlyRepayment;
    const result = await LoanRepository.create(data);
    return result;
  }

  private static async checkLoanEligibility(user: UserProps, data: LoanProps) {
    if (user.profileSetup !== "COMPLETED") {
      throw new ApplicationError("Complete your profile to be eligible for loan");
    }

    const pendingLoan = await LoanRepository.findOne({ userId: user.id, status: "PENDING" } as LoanQueryProps);
    if (pendingLoan) throw new ApplicationError("Request could not be completed as previous loans is pending");

    const result = await LoanRepository.findAll({ userId: user.id, status: "APPROVED" } as LoanQueryProps);
    const total = result.data?.reduce((a, c) => a + c.totalRepayments, 0);
    const balance = user.account.balance - total;

    if (balance * 3 < Number(data.amount)) {
      throw new ApplicationError("Insufficient savings balance. Topup your account to complete this process");
    }
  }

  static calculateLoan(loan: LoanProps) {
    const principal = Number(loan?.amount || 0);
    const annualInterestRate = Number(loan?.rate || 0);
    const loanDurationMonths = Number(loan?.duration || 0);
    const monthlyInterestRate = annualInterestRate / 12 / 100;

    const monthlyRepayment =
      (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -loanDurationMonths)) || 0;

    const totalRepayments = monthlyRepayment * loanDurationMonths;
    const totalInterest = totalRepayments - principal;

    return { principal, monthlyRepayment, totalRepayments, totalInterest };
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
