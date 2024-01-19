import { Router } from "express";

import { userRoutes } from "./UserRoutes";
import { postRoutes } from "./PostRoutes";

export const indexRoutes = Router();

indexRoutes.use("/user", userRoutes);
indexRoutes.use("/post", postRoutes);
