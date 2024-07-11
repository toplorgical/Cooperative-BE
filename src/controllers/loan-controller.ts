import { Response, Request } from "express";
import LoanServices from "../services/loan-service";
import { LoanProps } from "../types";
import ResponseManager from "../utils/response-manager";
import { RESPONSE } from "../constants/index";


class LoanController{
     static async create(req: any ,res: Response, ){
        const userId = req.user.data.user.id as number 
        const data ={
            amount:req.body.amount,
            duration : req.body.duration,
            userId

        } as LoanProps
       console.log(data)
        const loanDetails = await LoanServices.create(data)
        ResponseManager.success(res, null, 200, RESPONSE.SUCCESS);

    } 

}






export default LoanController