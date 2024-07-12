import _ from "lodash";
import { LoanProps ,CalculatorTypeProps} from "../types/index";
import { LoanRequestError, ValidationError } from "../utils/errorHandler";
import LoanValidations from "../validations/loan-validation";
import { RESPONSE } from "../constants/index";
import LoanRepository from "../repository/loan-repository";
 import UserRepository from "../repository/user-repository";
import { number } from "joi";
import { duration } from "moment";


class LoanServices {

    static async create(data : LoanProps){
       
        const validate=   LoanValidations.validate(data)
        
        if (validate) throw new ValidationError(validate)
         const getUserDetails = await UserRepository.findByPk(data.userId)
       // if (getUserDetails.balance < data.amount/2 && getUserDetails.registrationStatus!=="APPROVED")
           // throw new  LoanRequestError(RESPONSE.NOT_ELIGIBLE_FOR_LOAN)
            let loanData = await LoanRepository.getLoanType()
            if (!loanData.length) throw new LoanRequestError(RESPONSE.NO_LOAN_TYPE)
            let loanType = loanData[0];
            let result = {
                rate: loanType.rate,  
                amount: data.amount,
                duration: data.duration
            } as CalculatorTypeProps;

            let calculate = LoanServices.calculateLoan(result);

            const loanDetails = await LoanRepository.create({
                ...data,
                ...calculate,
                loanTypeId: loanType.id 
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
    

}












export default LoanServices