import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import appRouter from "./routes/baseRoutes";
import errorHandler from "./utils/errorHandler";
import Logger from "./utils/logger";
import AppScript from "./script/script";

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

appRouter(app);
Logger.setupErrorLogging();
app.use(errorHandler);

AppScript.initialize();

export default app;
