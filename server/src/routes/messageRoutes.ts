import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import authenticationMiddleware from "../middlewares/authMiddleware";
import MessageController from "../controllers/message-controller";

const messageRoutes = Router();

const isAuth = asyncHandler(authenticationMiddleware);

messageRoutes.get("/", [isAuth], asyncHandler(MessageController.find));
messageRoutes.get("/:id", [isAuth], asyncHandler(MessageController.findOne));

export default messageRoutes;
