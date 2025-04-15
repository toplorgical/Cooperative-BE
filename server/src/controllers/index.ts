import { Request, Response } from "express";
import ResponseManager from "../utils/response-manager";
import { NotFoundError } from "../utils/errorHandler";

class DefaultController {
  static home(req: Request, res: Response) {
    const data = {
      name: "cooperative App",
      version: "1.0",
      license: "MIT",
      author: "Toplorgical",
    };
    const message = "Application for Loan and Cooperative v1";
    ResponseManager.success(res, data, 200, message);
  }

  static notFound(req: Request, res: Response) {
    throw new NotFoundError("The requested route could not be found");
  }
}

export default DefaultController;
