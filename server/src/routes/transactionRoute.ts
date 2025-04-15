import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import authenticationMiddleware from "../middlewares/authMiddleware";
import TransactionController from "../controllers/transaction-controller";

const transactionsRoute = Router();

const isAuth = asyncHandler(authenticationMiddleware);

transactionsRoute.get("/", [isAuth], asyncHandler(TransactionController.findAll));
transactionsRoute.get("/:id", [isAuth], asyncHandler(TransactionController.findOne));

export default transactionsRoute;
