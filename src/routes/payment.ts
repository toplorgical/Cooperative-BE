import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import PaymentController from "../controllers/payment-controller";

const paymentroute = Router();

paymentroute.post("/paystack-webhook", asyncHandler(PaymentController.paystackWehook));

export default paymentroute;
