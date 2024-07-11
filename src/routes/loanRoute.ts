import { Router } from "express";
import LoanController from "../controllers/loan-controller";
import asyncHandler from "../middlewares/asyncHandler";
import authenticationMiddleware from "../middlewares/authMiddleware";

const loanRoutes = Router();

loanRoutes.post("/loan-request",authenticationMiddleware, asyncHandler(LoanController.create));



export default loanRoutes;
