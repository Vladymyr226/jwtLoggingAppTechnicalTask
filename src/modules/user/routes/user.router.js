import express from "express";
import { createUser, getUser, updateUser, deleteUser } from "../controllers/user.controller.js";

const { Router } = express;

export function createUserRouter() {

  const router = Router({ mergeParams: true });

  router.post("/", createUser);
  router.get("/:id", getUser);
  router.put("/:id", updateUser);
  router.patch("/:id", updateUser);
  router.delete("/:id", deleteUser);

  return router;
}