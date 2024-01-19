import mongoose from "mongoose";
import { CreatePostDto } from "../../Domain/Dtos";
import { UpdatePostDto } from "../../Domain/Dtos/Post/update-post.dto";
import { PostEntity } from "../../Domain/Entities/Post";
import { RepositoryFactory } from "../../Domain/Factories";
import { UserEntity } from "../../Domain/Entities";

export class PostRepository extends RepositoryFactory<
  PostEntity | (PostEntity & { user: UserEntity }),
  CreatePostDto,
  UpdatePostDto & { _id: string | mongoose.Types.ObjectId }
> {
  findAll() {
    return this.model.aggregate([
      { $match: { deleted_at: null } },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
    ]);
  }

  findById(
    _id: string | mongoose.Types.ObjectId
  ): Promise<(PostEntity & { user: UserEntity }) | null> {
    return this.model.findOne({ _id, deleted_at: null });
  }
}
