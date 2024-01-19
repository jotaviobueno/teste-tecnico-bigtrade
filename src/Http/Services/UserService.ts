import mongoose from "mongoose";
import { ServiceContract } from "../../Domain/Contracts";
import { CreateUserDto, UpdateUserDto } from "../../Domain/Dtos";
import { File, UserEntity } from "../../Domain/Entities";
import { HttpException, isMongoId } from "../../Domain/Utils";
import { UserModel } from "../../Models";
import { UserRepository } from "../Repositories/UserRepository";
import S3Service from "./S3Service";

class UserService
  implements
    ServiceContract<
      Omit<UserEntity, "password">,
      CreateUserDto,
      UpdateUserDto & { id: string }
    >
{
  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository(UserModel);
  }

  async create({
    file,
    ...dto
  }: CreateUserDto & { file?: File }): Promise<Omit<UserEntity, "password">> {
    const emailAlreadyExist = await this.userRepository.findByEmail(dto.email);

    if (emailAlreadyExist)
      throw new HttpException("Email or username already exist", 409);

    const usernameAlreadyExist = await this.userRepository.findByUsername(
      dto.username
    );

    if (usernameAlreadyExist)
      throw new HttpException("Email or username already exist", 409);

    const avatar =
      file && (await S3Service.uploadSingleFile({ file, path: "user/avatar" }));

    const user = await this.userRepository.create({ ...dto, avatar });

    return user;
  }

  findAll(): Promise<Omit<UserEntity, "password">[]> {
    return this.userRepository.findAll();
  }

  async findById(
    id: string | mongoose.Types.ObjectId
  ): Promise<Omit<UserEntity, "password">> {
    if (!isMongoId(id.toString()))
      throw new HttpException("Id sent is not objectId", 400);

    const user = await this.userRepository.findById(id);

    if (!user) throw new HttpException("User not found", 404);

    return user;
  }

  async update({
    file,
    ...dto
  }: UpdateUserDto & { id: string } & {
    id: string | mongoose.Types.ObjectId;
    file?: File;
  }): Promise<Omit<UserEntity, "password">> {
    const user = await this.findById(dto.id);

    if (dto.email) {
      const emailAlreadyExist = await this.userRepository.findByEmail(
        dto.email
      );

      if (emailAlreadyExist)
        throw new HttpException("Email or username already exist", 409);
    }

    if (dto.username) {
      const usernameAlreadyExist = await this.userRepository.findByUsername(
        dto.username
      );

      if (usernameAlreadyExist)
        throw new HttpException("Email or username already exist", 409);
    }

    const avatar =
      file && (await S3Service.uploadSingleFile({ file, path: "user/avatar" }));

    const update = await this.userRepository.update({
      ...dto,
      _id: user._id,
      avatar,
    });

    if (!update.modifiedCount)
      throw new HttpException("Failed to updaate", 406);

    return user;
  }

  async remove(id: string): Promise<boolean> {
    const user = await this.findById(id);

    const remove = await this.userRepository.softDelete(user._id);

    if (!remove.modifiedCount) throw new HttpException("Failed to remove", 406);

    return true;
  }
}

export default new UserService();
