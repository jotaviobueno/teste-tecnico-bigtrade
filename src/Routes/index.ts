import { Router } from "express";

import { userRoutes } from "./UserRoutes";

export const indexRoutes = Router();

indexRoutes.use("/user", userRoutes);
