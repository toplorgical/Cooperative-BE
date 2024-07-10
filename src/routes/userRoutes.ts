import { Router } from "express";
import UserController from "../controllers/user-controller";
import asyncHandler from "../middlewares/asyncHandler";
import authenticationMiddleware from "../middlewares/authMiddleware";

const userRoutes = Router();

userRoutes.post("/signup", asyncHandler(UserController.signup));
userRoutes.post("/signin", asyncHandler(UserController.signin));
userRoutes.post("/verify-otp", [authenticationMiddleware], asyncHandler(UserController.verifyOTP));
userRoutes.post("/forgot-password", asyncHandler(UserController.forgotPassword));
userRoutes.post("/reset-password", asyncHandler(UserController.resetPassword));
userRoutes.post("/requst-opt", asyncHandler(UserController.requestOTP));

userRoutes.get("/request-otp", [authenticationMiddleware], asyncHandler(UserController.requestOTP));

export default userRoutes;
