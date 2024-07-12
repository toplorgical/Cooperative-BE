import LoanTypeRepository from "../repository/loan-type-repository";
import { LoanTypeProps } from "../types";

class AppScript {
  static loanTypes = [
    { name: "Personal Loan", rate: 2.5 },
    { name: "Business Loan", rate: 7.5 },
    { name: "Mortgage Loan", rate: 4.3 },
  ] as LoanTypeProps[];
  static initialize() {
    AppScript.createLoanTypes();
  }
  static async createLoanTypes() {
    const isExist = await LoanTypeRepository.findOne({});
    if (isExist) return;
    await LoanTypeRepository.bulkCreate(AppScript.loanTypes);
    console.log("LOAN TYPES: created successfully...");
  }
}

export default AppScript;
