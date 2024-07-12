import _ from "lodash";
import { LoanProps ,CalculatorTypeProps, LoanTypeProps} from "../types/index";
import { ApplicationError, LoanRequestError, NotFoundError, ValidationError } from "../utils/errorHandler";
import LoanValidations from "../validations/loan-validation";
import { RESPONSE } from "../constants/index";
import LoanRepository from "../repository/loan-repository";
import UserRepository from "../repository/user-repository";
import { number } from "joi";
import { duration } from "moment";
import LoanTypeRepository from "../repository/loan-type-repository";


class LoanServices {

    static async create(data : LoanProps){
       
        const validate=   LoanValidations.validate(data)
        
        if (validate) throw new ValidationError(validate)
         const getUserDetails = await UserRepository.findByPk(data.userId)
       // if (getUserDetails.balance < data.amount/2 && getUserDetails.registrationStatus!=="APPROVED")
           // throw new  LoanRequestError(RESPONSE.NOT_ELIGIBLE_FOR_LOAN)
            let loanData = await LoanTypeRepository.findById(data.id)
            if (!loanData) throw new LoanRequestError(RESPONSE.NO_LOAN_TYPE)
            let loanType = loanData.id;
            let result = {
                rate: loanData.rate,  
                amount: data.amount,
                duration: data.duration
            } as CalculatorTypeProps;

            let calculate = LoanServices.calculateLoan(result);

            const loanDetails = await LoanRepository.create({
                ...data,
                ...calculate,
                loanTypeId: loanData.id 
            });
        return loanDetails
    }

    static calculateLoan (data:CalculatorTypeProps){
      const{rate, amount, duration} = data 
      const interest = (amount * rate * duration);
      const totalAmountToBePaid = amount + interest
      const monthlyReturn = totalAmountToBePaid/duration
      
      return  {interest, totalAmountToBePaid}

    }
    static async cancel(data: any) {
        if (!data.loanId && !data.userId) {
          throw new LoanRequestError(RESPONSE.INVALID_CREDENTAILS);
        }
    
        const loanDetails = await LoanRepository.findById(data.loanId)
        if (!loanDetails) {
          throw new LoanRequestError(RESPONSE.LOAN_DOES_NOT_EXIST);
        }
    
        if (loanDetails.status !== "PENDING") {
          throw new LoanRequestError(RESPONSE.NO_PENDING_LOAN);
        }
    
        const loanUpdate = { status: "CANCELED" };
       const updatedLoanDetails = await LoanRepository.updateById(loanUpdate as LoanProps, data.loanId);
    
  
        return updatedLoanDetails;
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
