import { Router } from "express";
import { UserValidator } from "../Domain/Validators";
import UserController from "../Http/Controllers/UserController";

export const userRoutes = Router();

const userValidator = new UserValidator();
const userController = UserController;

userRoutes.post(
  "/",
  (userValidator as any).create,
  (userController as any).create
);
userRoutes.get("/", (userController as any).findAll);
userRoutes.get("/:userId", (userController as any).findById);
userRoutes.patch(
  "/:userId",
  (userValidator as any).update,
  (userController as any).update
);
userRoutes.delete("/:userId", (userController as any).update);
