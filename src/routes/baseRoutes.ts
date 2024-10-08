import { Application } from "express";
import userRoutes from "./userRoutes";
import adminRoutes from "./adminRoutes";
import DefaultController from "../controllers";
import loanRoutes from "./loanRoutes";
import paymentroute from "./payment";
import analyticRoute from "./analyticsRoutes";
import transactionsRoute from "./transactionRoute";
import messageRoutes from "./messageRoutes";
import guarantorRoutes from "./guarantorRoutes";

function appRouter(app: Application) {
  app.get("/", DefaultController.home);
  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/payment", paymentroute);
  app.use("/api/v1/user/loans", loanRoutes);
  app.use("/api/v1/user/analytics", analyticRoute);
  app.use("/api/v1/user/transactions", transactionsRoute);
  app.use("/api/v1/user/messages", messageRoutes);
  app.use("/api/v1/user/guarantors", guarantorRoutes);
  app.use("/api/v1/admin", adminRoutes);
  app.use("*", DefaultController.notFound);
}

export default appRouter;
