import { Router } from "express";
import { UserValidator } from "../Domain/Validators";
import { UserController } from "../Http/Controllers/UserController";

export const userRoutes = Router();

const userValidator = new UserValidator();
const userController = new UserController();

userRoutes.post(
  "/",
  (req: any, res: any, next: () => void) =>
    userValidator.create(req, res, next),
  userController.create
);
userRoutes.get("/", userController.findAll);
userRoutes.get("/:userId", userController.findById);
userRoutes.patch(
  "/:userId",
  (req: any, res: any, next: () => void) =>
    userValidator.update(req, res, next),
  userController.update
);
userRoutes.delete("/:userId", userController.update);
