import { Router } from "express";
import { PostValidator } from "../Domain/Validators";
import { PostController } from "../Http/Controllers/PostController";

export const postRoutes = Router();

const postValidator = new PostValidator();
const userController = new PostController();

postRoutes.post(
  "/",
  (req: any, res: any, next: () => void) =>
    postValidator.create(req, res, next),
  userController.create
);
postRoutes.get("/", userController.findAll);
postRoutes.get("/:postId", userController.findById);
postRoutes.patch(
  "/:postId",
  (req: any, res: any, next: () => void) =>
    postValidator.update(req, res, next),
  userController.update
);
postRoutes.delete("/:postId", userController.remove);
