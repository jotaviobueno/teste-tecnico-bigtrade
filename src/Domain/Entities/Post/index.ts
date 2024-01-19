import mongoose from "mongoose";

export interface PostEntity {
  _id: mongoose.Types.ObjectId;
  title: string;
  content: string;
  images: string[];
  user_id: mongoose.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
