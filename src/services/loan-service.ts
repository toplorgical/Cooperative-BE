import _ from "lodash";
import moment from "moment";
import LoanRepository from "../repository/user-repository";
import { LoanProps } from "../types";
import { ApplicationError, ValidationError } from "../utils/errorHandler";
import LoanValidations from "../validations/loan-validation";
import { RESPONSE } from "../constants/index";



class LoanServices {

    static async create(data : LoanProps){
        const validate=   LoanValidations.validate(data)
        if (validate) throw new ValidationError(RESPONSE.INVALID_CREDENTAILS)

        const loanDetails = await LoanRepository.create(data)

        return loanDetails
    }

}












export default LoanServices