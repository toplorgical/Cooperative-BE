import { Response, Request } from "express";
import LoanServices from "../services/loan-service";
import { LoanProps } from "../types";
import ResponseManager from "../utils/response-manager";
import { RESPONSE } from "../constants/index";


class LoanController{
     static async create(req: any ,res: Response, ){
        const {userId} = req.user  
        const {amount, duration} = req.body  

        const loanDetails = await LoanServices.create({ amount, duration, userId} as LoanProps)
        ResponseManager.success(res, null, 200, RESPONSE.SUCCESS);

    } 

}






export default LoanController