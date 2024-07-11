import { Router } from "express";
import LoanController from "../controllers/loan-controller";
import asyncHandler from "../middlewares/asyncHandler";
import authenticationMiddleware from "../middlewares/authMiddleware";

const loanRoutes = Router();

loanRoutes.post("/request-loan",authenticationMiddleware, asyncHandler(LoanController.create));
loanRoutes.post("/cancel-loan/:id",authenticationMiddleware, asyncHandler(LoanController.cancel));



export default loanRoutes;
