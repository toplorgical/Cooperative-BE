import { Router } from "express";
import LoanController from "../controllers/loan-controller";
import LoanPaymentController from "../controllers/loanpayment-controller";
import asyncHandler from "../middlewares/asyncHandler";
import authenticationMiddleware from "../middlewares/authMiddleware";
 import PaymentController from "../controllers/payment-controller"


const paymentroute = Router();

paymentroute.post("/paystack-webhook", asyncHandler(PaymentController.paystackWehook));


export default paymentroute;
