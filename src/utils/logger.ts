import { Request } from "express";
import { ApplicationError } from "./errorHandler";

class Logger {
  static setupErrorLogging() {
    process.on("uncaughtException", (err: Error) => {
      console.log(`Uncaught Exception: ${err.message}`);
      process.exit(1);
    });

    process.on("unhandledRejection", (err: Error, promise) => {
      console.log("Unhandled rejection at ", promise, `reason: ${err.message}`);
      process.exit(1);
    });
  }

  static log(err: ApplicationError, req: Request) {
    const _d = {
      [err.name]: {
        url: req.url,
        message: err.message,
        stack: err.stack,
        statusCode: err.statusCode,
        timeStamp: new Date(),
      },
    };
    //console.log(_d);
  }
}

export default Logger;
