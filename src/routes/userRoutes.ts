import { Router } from "express";
import UserController from "../controllers/user-controller";
import asyncHandler from "../middlewares/asyncHandler";

const userRoutes = Router();

userRoutes.post("/signup", asyncHandler(UserController.signup));
userRoutes.post("/signin", asyncHandler(UserController.signin));

export default userRoutes;
