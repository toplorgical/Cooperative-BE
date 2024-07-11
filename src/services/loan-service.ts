import _ from "lodash";
import { LoanProps } from "../types/index";
import { LoanRequestError, ValidationError } from "../utils/errorHandler";
import LoanValidations from "../validations/loan-validation";
import { RESPONSE } from "../constants/index";
import LoanRepository from "../repository/loan-repository";
 import UserRepository from "../repository/user-repository";
import { number } from "joi";


class LoanServices {

    static async create(data : LoanProps){
        console.log(data)
        const validate=   LoanValidations.validate(data)
        
      //  if (validate) throw new ValidationError(RESPONSE.INVALID_CREDENTAILS)
      //   const getUserDetails = await UserRepository.findByPk(data.userId)
       // if (getUserDetails.balance < data.amount/2 && getUserDetails.registrationStatus==="APPROVED")
        //    throw new  LoanRequestError(RESPONSE.NOT_ELIGIBLE_FOR_LOAN)
//
      //  const loanDetails = await LoanRepository.create(data)

        return "loanDetails"
    }

    static async cancel(data: any ){
    
        if (!data.loanId && !data.userId) throw new LoanRequestError(RESPONSE.INVALID_CREDENTAILS)
        const loanDetails = await LoanRepository.findOne(data.loanId)
        if (!loanDetails) throw new LoanRequestError(RESPONSE.LOAN_DOES_NOT_EXIST)
        if (loanDetails.status !== "PENDING") throw new LoanRequestError(RESPONSE.NO_PENDING_LOAN)
        const loanUpdate ={status : "CANCELED"}
        const loanInfo = LoanRepository.updateById({loanUpdate}as any ,data.loanId)
        
        return loanInfo;
    } 

    

}












export default LoanServices