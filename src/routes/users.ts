import { Router } from "express";
import UserController from "../controllers/user-controller";
import asyncHandler from "../middlewares/asyncHandler";
import authenticationMiddleware from "../middlewares/authMiddleware";
import administratorMiddleware from "../middlewares/adminMiddleware";

const userRoutes = Router();

const isAuth = asyncHandler(authenticationMiddleware);
userRoutes.post("/signup", asyncHandler(UserController.signup));
userRoutes.post("/signin", asyncHandler(UserController.signin));
userRoutes.post("/verify-otp", [isAuth], asyncHandler(UserController.verifyOTP));
userRoutes.post("/forgot-password", asyncHandler(UserController.forgotPassword));
userRoutes.post("/reset-password", asyncHandler(UserController.resetPassword));

userRoutes.put("/me/personal-info", [isAuth], asyncHandler(UserController.personalInfo));

userRoutes.put("/me/work-info", [isAuth], asyncHandler(UserController.workInfo));
userRoutes.put("/me/change-password", [isAuth], asyncHandler(UserController.changePassword));

userRoutes.get("/", [asyncHandler(administratorMiddleware)], asyncHandler(UserController.findUsers));
userRoutes.get("/me", [isAuth], asyncHandler(UserController.getUser));
userRoutes.get("/request-otp", [isAuth], asyncHandler(UserController.requestOTP));
userRoutes.get("/single/:id", [asyncHandler(administratorMiddleware)], asyncHandler(UserController.findOneUser));

export default userRoutes;
