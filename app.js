import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { createUserRouter } from "./src/modules/user/routes/user.router.js";
import { getStatus } from "./src/modules/system/controllers/health.check.controller.js";
import { createAuthRouter } from "./src/modules/auth/routes/auth.router.js";

const app = express();
const { Router } = express;
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


function addApiRoutes() {
  const router = Router({ mergeParams: true });

  router.use("/users", createUserRouter());
  router.use("/auth", createAuthRouter());

  return router;
}

app.use("/api", addApiRoutes());


app.get("/healthcheck", getStatus);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.APP_PORT}`);
});