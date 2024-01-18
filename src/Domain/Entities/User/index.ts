import mongoose from "mongoose";

export interface UserEntity {
  _id: mongoose.ObjectId;
  name: string;
  email: string;
  avatar: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
