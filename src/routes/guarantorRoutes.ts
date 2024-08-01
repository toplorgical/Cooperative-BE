import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import authenticationMiddleware from "../middlewares/authMiddleware";
import GuarantorController from "../controllers/guarantor-controller";

const guarantorRoutes = Router();

const isAuth = asyncHandler(authenticationMiddleware);

guarantorRoutes.put("/accept/:id", [isAuth], asyncHandler(GuarantorController.accept));
guarantorRoutes.put("/reject/:id", [isAuth], asyncHandler(GuarantorController.reject));

export default guarantorRoutes;
