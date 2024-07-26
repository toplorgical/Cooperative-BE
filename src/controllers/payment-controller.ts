
import { Response, Request } from "express";
import PaymentService from "../services/payment-services";
import ResponseManager from "../utils/response-manager";
import config from "../config/config";
import { ApplicationError } from "../utils/errorHandler";
const crypto = require('crypto');

class PaymentController{
    static async paystackWehook (req : Request, res : Response){
        const PAYSTACK_KEY = config.PAYSTACK.SECRET_KEY;
        const PAYSTACK_SIGNATURE_HEADER = 'x-paystack-signature';
             //Verify Paystack signature
        const hash = crypto.createHmac('sha512', PAYSTACK_KEY)
                .update(JSON.stringify(req.body))
               .digest('hex');
            
        if (hash !== req.headers[PAYSTACK_SIGNATURE_HEADER]) throw new ApplicationError('Invalid signature');

           const data = req.body

        const result = PaymentService.paystackWebhook(data)
        console.log(result)

        ResponseManager.success(res, { result }, 200);





    }



}


export default PaymentController