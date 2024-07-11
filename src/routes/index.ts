import { Application, Request, Response, Router } from "express";
import ResponseManager from "../utils/response-manager";
import { NotFoundError } from "../utils/errorHandler";
import {userRoutes} from "./userRoutes";
import loanRoutes from "./loanRoute";

function appRouter(app: Application) {
  app.get("/", homeRoute);
  app.use("/api/v1/users", userRoutes)
  app.use("/api/v1/loans", loanRoutes)

  app.use("*", notFoundRoute);

  function homeRoute(req: Request, res: Response) {
    const data = {
      name: "cooperative App",
      version: "1.0",
      license: "MIT",
      author: "Toplorgical",
    };
    const message = "Application for Loan and Cooperative v1";
    ResponseManager.success(res, data, 200, message);
  }

  function notFoundRoute(req: Request, res: Response) {
    throw new NotFoundError("The requested route could not be found");
  }
}

export default appRouter;
