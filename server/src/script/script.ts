import Account from "../models/account";
import AccountRepository from "../repository/account-repository";
import LoanRepository from "../repository/loan-repository";
import LoanTypeRepository from "../repository/loan-type-repository";
import { AccountProps, LoanTypeProps } from "../types";

class AppScript {
  static loanTypes = [
    { name: "Personal Loan", rate: 2.5 },
    { name: "Business Loan", rate: 7.5 },
    { name: "Mortgage Loan", rate: 4.3 },
  ] as LoanTypeProps[];
  static initialize() {
    // AppScript.createLoanTypes();
    // AppScript.createAccount();
  }
  static async createLoanTypes() {
    const isExist = await LoanTypeRepository.findOne({});
    if (isExist) return;
    await LoanTypeRepository.bulkCreate(AppScript.loanTypes);
    console.log("LOAN TYPES: created successfully...");
  }

  static async createAccount() {
    const data = {} as AccountProps;
    data.userId = 1007897761;

    const result = await AccountRepository.create(data);
    console.log(result);
    console.log("ACCOUNT: created successfully...");
  }
}

export default AppScript;
