import mongoose from "mongoose";
import { ServiceContract } from "../../Domain/Contracts";
import { CreatePostDto } from "../../Domain/Dtos";
import { UserEntity } from "../../Domain/Entities";
import { PostEntity } from "../../Domain/Entities/Post";
import { PostModel } from "../../Models";
import { PostRepository } from "../Repositories/PostRepository";
import UserService from "./UserService";
import { HttpException, isMongoId } from "../../Domain/Utils";
import { UpdatePostDto } from "../../Domain/Dtos/Post/update-post.dto";

class PostService
  implements
    ServiceContract<
      PostEntity | (PostEntity & { user: UserEntity }),
      CreatePostDto,
      UpdatePostDto
    >
{
  private readonly postRepository: PostRepository;
  constructor() {
    this.postRepository = new PostRepository(PostModel);
  }

  async create(dto: CreatePostDto): Promise<PostEntity> {
    const user = await UserService.findById(dto.user_id);

    const post = await this.postRepository.create({
      ...dto,
      user_id: user._id,
    });

    return post;
  }

  findAll() {
    return this.postRepository.findAll();
  }

  async findById(
    id: string | mongoose.Types.ObjectId
  ): Promise<PostEntity & { user: UserEntity }> {
    if (!isMongoId(id.toString()))
      throw new HttpException("Id sent is not objectId", 400);

    const post = await this.postRepository.findById(id);

    if (!post) throw new HttpException("Post not found", 404);

    return post;
  }

  async update(
    dto: UpdatePostDto & { id: string | mongoose.Types.ObjectId }
  ): Promise<PostEntity | (PostEntity & { user: UserEntity })> {
    const post = await this.findById(dto.id);

    if (dto.user_id) await UserService.findById(dto.user_id);

    const update = await this.postRepository.update({ ...dto, _id: post._id });

    if (!update.modifiedCount) throw new HttpException("Failed to update", 406);

    return post;
  }

  async remove(id: string | mongoose.Types.ObjectId): Promise<boolean> {
    const post = await this.findById(id);

    const remove = await this.postRepository.softDelete(post._id);

    if (!remove.modifiedCount) throw new HttpException("Failed to remove", 406);

    return true;
  }
}

export default new PostService();
