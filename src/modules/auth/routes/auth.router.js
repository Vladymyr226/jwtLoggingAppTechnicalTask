import express from "express";
import { registration, login } from "../../auth/conrtollers/auth.contoller.js";
import Auth from "../../user/middleware/verifyToken.js";

const { Router } = express;

export function createAuthRouter() {

  const router = Router({ mergeParams: true });

  router.post("/register", registration);
  router.post("/login", Auth.verifyToken, login);

  return router;
}