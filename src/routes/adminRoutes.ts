import { Router } from "express";
import UserController from "../controllers/user-controller";
import asyncHandler from "../middlewares/asyncHandler";
import administratorMiddleware from "../middlewares/adminMiddleware";

const adminRoutes = Router();

const isAdmin = asyncHandler(administratorMiddleware);

adminRoutes.get("/users", [isAdmin], asyncHandler(UserController.findUsers));
adminRoutes.get("/users/:id", [isAdmin], asyncHandler(UserController.findOneUser));

export default adminRoutes;
