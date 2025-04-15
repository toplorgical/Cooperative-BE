import { Router } from "express";
import LoanController from "../controllers/loan-controller";
import LoanPaymentController from "../controllers/loanpayment-controller";
import asyncHandler from "../middlewares/asyncHandler";
import authenticationMiddleware from "../middlewares/authMiddleware";

const loanRoutes = Router();

const isAuth = asyncHandler(authenticationMiddleware);

loanRoutes.post("/", [isAuth], asyncHandler(LoanController.create));
loanRoutes.post("/cancel/:id", [isAuth], asyncHandler(LoanController.cancelLoan));

loanRoutes.get("/", [isAuth], asyncHandler(LoanController.getLoans));
loanRoutes.get("/types", [isAuth], asyncHandler(LoanController.getLoanTypes));

loanRoutes.get("/:id", [isAuth], asyncHandler(LoanController.getLoan));

loanRoutes.post("/repayment-from-account", [isAuth], asyncHandler(LoanPaymentController.loanPaymentFromAccount));

export default loanRoutes;
