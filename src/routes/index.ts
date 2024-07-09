import { Application, Request, Response, Router } from "express";
import ResponseManager from "../utils/response-manager";
import { NotFoundError } from "../utils/errorHandler";

function appRouter(app: Application) {
  app.get("/", homeRoute);
  app.use("*", notFoundRoute);

  function homeRoute(req: Request, res: Response) {
    const data = {
      name: "Fresible Music",
      version: "2.0",
      license: "MIT",
      author: "Fresible",
    };
    const message = "Fresible Music digital music distribution platform API v2";
    ResponseManager.success(res, data, 200, message);
  }

  function notFoundRoute(req: Request, res: Response) {
    throw new NotFoundError("The requested route could not be found");
  }
}

export default appRouter;
