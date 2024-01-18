import "dotenv/config";
import express from "express";
import { mongodbConnection } from "./Db";
import { environment } from "./Config";
import { indexRoutes } from "./Routes";
import cors from "cors";

const app = express();
mongodbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(indexRoutes);

app.listen(environment.PORT, () =>
  console.log(`Server is running on PORT: ${environment.PORT}`)
);
