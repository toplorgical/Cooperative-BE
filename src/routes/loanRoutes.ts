import { Router } from "express";
import LoanController from "../controllers/loan-controller";
import asyncHandler from "../middlewares/asyncHandler";
import authenticationMiddleware from "../middlewares/authMiddleware";

const loanRoutes = Router();

loanRoutes.post("/request-loan",authenticationMiddleware, asyncHandler(LoanController.create));
loanRoutes.post("/cancel-loan/:id",authenticationMiddleware, asyncHandler(LoanController.cancelLoan));
loanRoutes.get("/get-loan",authenticationMiddleware, asyncHandler(LoanController.getLoan)); //getAllLone
loanRoutes.get("/getall-loan",authenticationMiddleware, asyncHandler(LoanController.getAllLone)); //
loanRoutes.get("/get-loan-type",authenticationMiddleware, asyncHandler(LoanController.getLoanType))



export default loanRoutes;
