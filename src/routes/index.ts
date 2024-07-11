import { Application } from "express";
import userRoutes from "./users";
import adminRoutes from "./admins";
import DefaultController from "../controllers";

function appRouter(app: Application) {
  app.get("/", DefaultController.home);
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/admin", adminRoutes);
  app.use("*", DefaultController.notFound);
}

export default appRouter;
