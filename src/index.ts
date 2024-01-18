import "dotenv/config";
import express from "express";
import { mongodbConnection } from "./Db";
import { environment } from "./Config";

const app = express();
mongodbConnection();

app.use(express.json());

app.listen(environment.PORT, () =>
  console.log(`Server is running on PORT: ${environment.PORT}`)
);
