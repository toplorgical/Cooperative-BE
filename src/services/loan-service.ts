import _ from "lodash";
import { LoanGuarantorProps, LoanProps, LoanQueryProps, LoanTypeProps, MessageProps, UserProps } from "../types/index";
import { ApplicationError, NotFoundError, ValidationError } from "../utils/errorHandler";
import LoanValidations from "../validations/loan-validation";
import LoanRepository from "../repository/loan-repository";
import LoanTypeRepository from "../repository/loan-type-repository";
import UserRepository from "../repository/user-repository";
import MessageRepository from "../repository/message-repository";
import { MassagingProps, MessagingService } from "./messaging-service";

class LoanServices {
  static async create(data: LoanProps, user: UserProps) {
    const error = LoanValidations.create(data);
    if (error) throw new ValidationError(error);

    const loanType = await LoanTypeRepository.findOne({ id: data.loanTypeId });
    if (!loanType) throw new ApplicationError(`Loan type is invalid`);

    await LoanServices.checkLoanEligibility(user, data);
    const _gurantors = await LoanServices.checkGuarantorsEligibility(data);

    const total = LoanServices.calculateLoan({ ...data, rate: loanType.rate });
    data.rate = loanType.rate;
    data.totalInterest = total.totalInterest;
    data.totalRepayments = total.totalRepayments;
    data.monthlyRepayment = total.monthlyRepayment;
    data.guarantors = _gurantors;
    const result = await LoanRepository.create(data);
    const messages = await LoanServices.constructMessage(result, user, loanType);
    await MessageRepository.bulkCreate(messages);

    const textMessage = await LoanServices.constructGuarantorTextMessage(result, user);
    MessagingService.send(textMessage);
    return result;
  }

  static async constructGuarantorTextMessage(loan: LoanProps, user: UserProps) {
    const guarantors = await LoanRepository.findGuarantors({ loanId: loan.id });
    const data = {} as MassagingProps;
    data.to = guarantors.map((item) => item.user.phone);
    data.sms = `This is to inform you that ${user.firstName} ${user.lastName} with membership ID: ${user.registrationId} has submitted a loan request. As part of the application process, ${user.firstName} ${user.lastName} has listed you as their guarantor for this loan.`;
    return data;
  }
  static async constructMessage(loan: LoanProps, user: UserProps, loanType: LoanTypeProps) {
    const result = [] as MessageProps[];
    const guarantors = await LoanRepository.findGuarantors({ loanId: loan.id });
    for (const guarantor of guarantors) {
      const _data = {} as MessageProps;
      const meta = _.pick(loan, ["amount", "totalInterest", "monthlyRepayment", "totalRepayments"]) as LoanProps;
      meta.loanType = loanType;

      _data.title = "Loan Request";
      _data.description = `This is to inform you that [${user.firstName} ${user.lastName}] with membership ID: [${user.registrationId}] has submitted a loan request. As part of the application process, [${user.firstName} ${user.lastName}] has listed you as their guarantor for this loan.`;
      _data.from = loan.userId;
      _data.to = guarantor.userId;
      _data.metadata = { type: "loan", data: meta };
      result.push(_data);
    }
    return result;
  }

  private static async checkLoanEligibility(user: UserProps, data: LoanProps) {
    const guarantorsId = data.guarantors.map((item) => item.registrationId);

    if (user.profileSetup !== "COMPLETED") {
      throw new ApplicationError("Complete your profile to be eligible for loan");
    }

    if (guarantorsId.includes(user.registrationId)) {
      throw new ApplicationError(`You can't use yourself as a guarantor`);
    }

    const pendingLoan = await LoanRepository.findOne({ userId: user.id, status: "PENDING" } as LoanQueryProps);
    if (pendingLoan) throw new ApplicationError("Request could not be completed as previous loans are still pending");

    const result = await LoanRepository.findAll({ userId: user.id, status: "APPROVED" } as LoanQueryProps);
    const total = result.data?.reduce((a, c) => a + c.totalRepayments, 0);
    const balance = user.account.balance - total;

    if (balance * 3 < Number(data.amount)) {
      throw new ApplicationError("Insufficient savings balance. Topup your account to complete this process");
    }
  }

  private static async checkGuarantorsEligibility(data: LoanProps) {
    const _gurantors = [] as LoanGuarantorProps[];
    const guarantors = data.guarantors as LoanGuarantorProps[];

    for (const guarantor of guarantors) {
      const user = await UserRepository.findOne({ registrationId: guarantor.registrationId });
      if (!user) throw new NotFoundError(`Membership ID "${guarantor.registrationId}" is invalid`);

      if (user.profileSetup !== "COMPLETED") {
        throw new ApplicationError(`Guarantor with membership ID "${user.registrationId}" is ineligible`);
      }

      const pendingLoan = await LoanRepository.findOne({ userId: user.id, status: "PENDING" } as LoanQueryProps);
      if (pendingLoan) {
        throw new ApplicationError(`Guarantor with membership ID "${user.registrationId}" is ineligible. `);
      }

      const result = await LoanRepository.findAll({ userId: user.id, status: "APPROVED" } as LoanQueryProps);
      const total = result.data?.reduce((a, c) => a + c.totalRepayments, 0);
      const balance = user.account.balance - total;

      if (balance * 3 < Number(data.amount)) {
        throw new ApplicationError(`Guarantor with membership ID "${user.registrationId}" is ineligible`);
      }
      _gurantors.push({ registrationId: user.registrationId, userId: user.id } as LoanGuarantorProps);
    }
    return _gurantors;
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

  static async changeStatus(data: LoanProps) {
    const error = LoanValidations.status(data);
    if (error) throw new ValidationError(error);

    const loan = await LoanRepository.findById(data.id);
    if (!loan) throw new NotFoundError("The requested loan could not be found");
    if (loan.status !== "PENDING") throw new ApplicationError("Request count not be completed as loan is not pending");
    if (data.status === "APPROVED") {
      for (const item of loan.guarantors) {
        if (item.status !== "ACCEPTED") {
          throw new ApplicationError(
            `Loan request was not approved by guarantor with Membership ID ${item.registrationId}`
          );
        }
      }
    }
    const result = await LoanRepository.updateById(data, data.id);
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

  static async updateGuarantorStatus(data: LoanGuarantorProps, id: number, userId: number) {
    const guarantor = await LoanRepository.findOneGuarantor({ id, userId });
    if (!guarantor) throw new NotFoundError("The requested loan could not be found");
    if (guarantor.status !== "PENDING") {
      throw new ApplicationError("Request could not be completed as loan is not pending.");
    }

    const loan = await LoanRepository.findById(guarantor.loanId);
    if (!loan) throw new NotFoundError("The requested loan could not be found");
    if (loan.status !== "PENDING") throw new ApplicationError("Request count not be completed as loan is not pending");

    await LoanRepository.updateOneGuarantor(data, id);
    return { message: "Loan type deleted successfully" };
  }
}

export default LoanServices;
