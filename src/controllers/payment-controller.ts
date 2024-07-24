
import { Response, Request } from "express";
import PaymentService from "../services/payment-services";
import ResponseManager from "../utils/response-manager";

class PaymentController{
    static async paystackWehook (req : Request, res : Response){

        const data = req.body

        const result = PaymentService.paystackWebhook(data)
        console.log(result)

        ResponseManager.success(res, { result }, 200);





    }



}


export default PaymentController