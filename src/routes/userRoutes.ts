import { Router } from "express";
import UserController from "../controllers/user-controller";
import asyncHandler from "../middlewares/asyncHandler";

const userRoutes = Router();

userRoutes.post("/signup", asyncHandler(UserController.signup));
userRoutes.post("/signin", asyncHandler(UserController.signin));
userRoutes.post("/request-otp", asyncHandler(UserController.requestOTP));
userRoutes.post("/verify-otp", asyncHandler(UserController.verifyOTP));
userRoutes.post("/forgot-password", asyncHandler(UserController.forgotPassword));
userRoutes.post("/reset-password", asyncHandler(UserController.resetPassword));

export default userRoutes;
