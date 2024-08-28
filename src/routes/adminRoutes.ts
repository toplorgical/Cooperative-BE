import { Router } from "express";
import UserController from "../controllers/user-controller";
import asyncHandler from "../middlewares/asyncHandler";
import administratorMiddleware from "../middlewares/adminMiddleware";
import authenticationMiddleware from "../middlewares/authMiddleware";
import LoanController from "../controllers/loan-controller";
import TransactionController from "../controllers/transaction-controller";
import AnanlyticsController from "../controllers/analytics-controller";
import MessageController from "../controllers/message-controller";

const adminRoutes = Router();

const isAuth = asyncHandler(authenticationMiddleware);
const isAdmin = asyncHandler(administratorMiddleware); 

adminRoutes.get("/users", [isAuth, isAdmin], asyncHandler(UserController.findUsers));
adminRoutes.get("/loans/", [isAuth, isAdmin], asyncHandler(LoanController.getLoans));
adminRoutes.get("/loan-types", [isAuth, isAdmin], asyncHandler(LoanController.getLoanTypes));
adminRoutes.get("/txns", [isAuth, isAdmin], asyncHandler(TransactionController.findAll));
adminRoutes.get("/analytics", [isAuth, isAdmin], asyncHandler(AnanlyticsController.getTill));
adminRoutes.get("/analytics/loans", [isAuth, isAdmin], asyncHandler(AnanlyticsController.loans));
adminRoutes.get("/analytics/txns", [isAuth, isAdmin], asyncHandler(AnanlyticsController.txns));

adminRoutes.get("/txns/:id", [isAuth, isAdmin], asyncHandler(TransactionController.findOne));
adminRoutes.get("/users/:id", [isAuth, isAdmin], asyncHandler(UserController.findOneUser));
adminRoutes.get("/loans/:id", [isAuth, isAdmin], asyncHandler(LoanController.getLoan));

adminRoutes.post("/loan-types", [isAuth, isAdmin], asyncHandler(LoanController.createLoanType));
adminRoutes.post("/users/change-role", [isAuth, isAdmin], asyncHandler(UserController.changeRole));
adminRoutes.post("/users/send-email", [isAuth, isAdmin], asyncHandler(MessageController.sendMailToUsers))
adminRoutes.post("/loans/change-status", [isAuth, isAdmin], asyncHandler(LoanController.changeStatus));

adminRoutes.put("/loan-types/:id", [isAuth, isAdmin], asyncHandler(LoanController.updateLoanType));

adminRoutes.delete("/loan-types/:id", [isAuth, isAdmin], asyncHandler(LoanController.deleteLoanType));

export default adminRoutes;
