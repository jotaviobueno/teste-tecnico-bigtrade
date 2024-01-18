import mongoose from "mongoose";
import { CreateUserDto, UpdateUserDto } from "../../Domain/Dtos";
import { UserEntity } from "../../Domain/Entities";
import { RepositoryFactory } from "../../Domain/factories";

export class UserRepository extends RepositoryFactory<
  UserEntity,
  CreateUserDto,
  UpdateUserDto & { _id: string | mongoose.ObjectId }
> {
  findByEmail(email: string): Promise<UserEntity | null> {
    return this.model.findOne<UserEntity>({ email, deleted_at: null });
  }

  findByUsername(username: string): Promise<UserEntity | null> {
    return this.model.findOne<UserEntity>({ username, deleted_at: null });
  }

  findById(_id: string | mongoose.ObjectId): Promise<UserEntity | null> {
    return this.model.findOne<UserEntity>({ _id, deleted_at: null });
  }

  findAll(): Promise<UserEntity[]> {
    return this.model.find();
  }
}
