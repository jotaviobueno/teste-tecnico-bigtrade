import mongoose from "mongoose";
import { environment } from "../Config";

export function mongodbConnection() {
  try {
    mongoose.connect(environment.DATABASE_URL);

    console.log("Database connection established.");
  } catch (e) {
    console.log(e);
  }
}
