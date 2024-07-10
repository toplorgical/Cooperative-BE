import { Router } from "express";
import UserController from "../controllers/user-controller";
import asyncHandler from "../middlewares/asyncHandler";

const userRoutes = Router();

userRoutes.post("/signup", asyncHandler(UserController.signup));
userRoutes.post("/signin", asyncHandler(UserController.signin));
userRoutes.post("/reset-password", asyncHandler(UserController.resetPassword));
userRoutes.post("/requst-opt", asyncHandler(UserController.requestOTP));

export default userRoutes;
