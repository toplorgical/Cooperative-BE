import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import authenticationMiddleware from "../middlewares/authMiddleware";
import AnanlyticsController from "../controllers/analytics-controller";

const analyticRoute = Router();

const isAuth = asyncHandler(authenticationMiddleware);

analyticRoute.get("/default", [isAuth], asyncHandler(AnanlyticsController.getDefault));
analyticRoute.get("/loans", [isAuth], asyncHandler(AnanlyticsController.loans));
analyticRoute.get("/txns", [isAuth], asyncHandler(AnanlyticsController.txns));

export default analyticRoute;
