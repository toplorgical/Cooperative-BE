import _ from "lodash";
import { LoanProps } from "../types/index";
import { ApplicationError, ValidationError } from "../utils/errorHandler";
import LoanValidations from "../validations/loan-validation";
import { RESPONSE } from "../constants/index";
import LoanRepository from "../repository/loan-repository";
 import UserRepository from "../repository/user-repository";


class LoanServices {

    static async create(data : LoanProps){
        const validate=   LoanValidations.validate(data)
        
        if (validate) throw new ValidationError(RESPONSE.INVALID_CREDENTAILS)
         const getUserDetails = await UserRepository.findByPk(data.userId)
        console.log(getUserDetails)
        if (getUserDetails.balance < data.amount/2 && getUserDetails.status==="APPROVED")
            throw new 

        //const loanDetails = await LoanRepository.create(data)

        return "loanDetails"
    }

}












export default LoanServices