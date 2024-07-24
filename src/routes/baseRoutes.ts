import { Application } from "express";
import userRoutes from "./userRoutes";
import adminRoutes from "./adminRoutes";
import DefaultController from "../controllers";
import loanRoutes from "./loanRoutes";
import paymentroute from "./payment";

function appRouter(app: Application) {
  app.get("/", DefaultController.home);
  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/payment", paymentroute);
  app.use("/api/v1/user/loans", loanRoutes);
  app.use("/api/v1/admin", adminRoutes);
  app.use("*", DefaultController.notFound);
}

export default appRouter;
