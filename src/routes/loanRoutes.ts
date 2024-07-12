import { Router } from "express";
import LoanController from "../controllers/loan-controller";
import asyncHandler from "../middlewares/asyncHandler";
import authenticationMiddleware from "../middlewares/authMiddleware";

const loanRoutes = Router();

loanRoutes.post("/request", authenticationMiddleware, asyncHandler(LoanController.create));
loanRoutes.post("/cancel/:id", authenticationMiddleware, asyncHandler(LoanController.cancelLoan));

loanRoutes.get("/", authenticationMiddleware, asyncHandler(LoanController.getLoans));
loanRoutes.get("/:id", authenticationMiddleware, asyncHandler(LoanController.getLoan));
loanRoutes.get("/types", authenticationMiddleware, asyncHandler(LoanController.getLoanTypes));

export default loanRoutes;
