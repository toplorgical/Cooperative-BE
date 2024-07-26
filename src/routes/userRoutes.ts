import { Router } from "express";
import UserController from "../controllers/user-controller";
import asyncHandler from "../middlewares/asyncHandler";
import authenticationMiddleware from "../middlewares/authMiddleware";

const userRoutes = Router();

const isAuth = asyncHandler(authenticationMiddleware);
userRoutes.post("/signup", asyncHandler(UserController.signup));
userRoutes.post("/signin", asyncHandler(UserController.signin));
userRoutes.post("/verify-otp", [isAuth], asyncHandler(UserController.verifyOTP));
userRoutes.post("/forgot-password", asyncHandler(UserController.forgotPassword));
userRoutes.post("/reset-password", asyncHandler(UserController.resetPassword));

userRoutes.put("/account/personal-info", [isAuth], asyncHandler(UserController.personalInfo));
userRoutes.put("/account/work-info", [isAuth], asyncHandler(UserController.workInfo));
userRoutes.put("/account/change-password", [isAuth], asyncHandler(UserController.changePassword));
userRoutes.put("/account/change-phone", [isAuth], asyncHandler(UserController.changePhone));

userRoutes.get("/account", [isAuth], asyncHandler(UserController.getUser));
userRoutes.get("/request-otp", [isAuth], asyncHandler(UserController.requestOTP));

userRoutes.post("/mail",   asyncHandler(UserController.sendMail));


export default userRoutes;
