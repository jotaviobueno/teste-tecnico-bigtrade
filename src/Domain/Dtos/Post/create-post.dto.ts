import mongoose from "mongoose";

export interface CreatePostDto {
  title: string;
  user_id: string | mongoose.Types.ObjectId;
  content: string;
  images?: string[];
}
