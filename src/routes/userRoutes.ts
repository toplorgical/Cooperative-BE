import { Router } from "express";
import UserController from "../controllers/user-controller";
import asyncHandler from "../middlewares/asyncHandler";
import authenticationMiddleware from "../middlewares/authMiddleware";

const userRoutes = Router();

userRoutes.post("/signup", asyncHandler(UserController.signup));
userRoutes.post("/signin", asyncHandler(UserController.signin));
userRoutes.post("/verify-otp", [asyncHandler(authenticationMiddleware)], asyncHandler(UserController.verifyOTP));
userRoutes.post("/forgot-password", asyncHandler(UserController.forgotPassword));
userRoutes.post("/reset-password", asyncHandler(UserController.resetPassword));

userRoutes.put(
  "/me/personal-info",
  [asyncHandler(authenticationMiddleware)],
  asyncHandler(UserController.personalInfo)
);

userRoutes.put("/me/work-info", [asyncHandler(authenticationMiddleware)], asyncHandler(UserController.workInfo));
userRoutes.put(
  "/me/change-password",
  [asyncHandler(authenticationMiddleware)],
  asyncHandler(UserController.changePassword)
);

userRoutes.get("/me", [asyncHandler(authenticationMiddleware)], asyncHandler(UserController.getUser));
userRoutes.get("/request-otp", [asyncHandler(authenticationMiddleware)], asyncHandler(UserController.requestOTP));

export default userRoutes;
