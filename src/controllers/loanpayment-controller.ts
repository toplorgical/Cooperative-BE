import { Response, Request} from "express"
import LaonPaymentService from "../services/loanpayment-services"
import { UserProps } from "../types"
import ResponseManager from "../utils/response-manager"



class LoanPaymentController {
    static async loanPaymentFromAccount(req:any, res: Response){
        let id = req.user.id  
        let amount = req.body.amount
        const update  = await LaonPaymentService.repaymentFromAccount(id, amount)
        return ResponseManager.success(res,update, 200, );


    }


}







export default LoanPaymentController