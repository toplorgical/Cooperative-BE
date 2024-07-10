import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import appRouter from "./routes";
import errorHandler from "./utils/errorHandler";
import Logger from "./utils/logger";
import { MessagingService } from "./services/messaging-service";

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

appRouter(app);
Logger.setupErrorLogging();
app.use(errorHandler);

export default app;
