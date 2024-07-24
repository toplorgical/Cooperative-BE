import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import authenticationMiddleware from "../middlewares/authMiddleware";
import TransactionController from "../controllers/transaction-controller";

const transactionsRoute = Router();

transactionsRoute.get("/", authenticationMiddleware, asyncHandler(TransactionController.findAll));
transactionsRoute.get("/:id", authenticationMiddleware, asyncHandler(TransactionController.findOne));

export default transactionsRoute;
