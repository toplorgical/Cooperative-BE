import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import authenticationMiddleware from "../middlewares/authMiddleware";
import AnanlyticsController from "../controllers/analytics-controller";

const analyticRoute = Router();

analyticRoute.get("/default", authenticationMiddleware, asyncHandler(AnanlyticsController.getDefault));
analyticRoute.get("/loans", authenticationMiddleware, asyncHandler(AnanlyticsController.loans));
analyticRoute.get("/txns", authenticationMiddleware, asyncHandler(AnanlyticsController.txns));

export default analyticRoute;
