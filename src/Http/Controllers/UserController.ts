import { CreateUserDto, UpdateUserDto } from "../../Domain/Dtos";
import UserService from "../Services/UserService";

export class UserController {
  async create(
    { createUserDto }: Request & { createUserDto: CreateUserDto },
    res: any
  ) {
    try {
      const data = await UserService.create(createUserDto);

      return res.status(201).json(data);
    } catch (e: any) {
      console.log(e);
      return res.status(e.code).json({ error: e.message });
    }
  }

  async findById(req: Request & { params: { userId: string } }, res: any) {
    try {
      const userId = req.params.userId;

      const data = await UserService.findById(userId);

      return res.status(200).json(data);
    } catch (e: any) {
      return res.status(e.code).json({ error: e.message });
    }
  }

  async findAll(_: Request, res: any) {
    const data = await UserService.findAll();

    return res.status(200).json(data);
  }

  async update(
    req: Request & {
      params: { userId: string };
      updateUserDto: UpdateUserDto;
    },
    res: any
  ) {
    try {
      const userId = req.params.userId;
      const updateUserDto = req.updateUserDto;

      const data = await UserService.update({
        id: userId,
        ...updateUserDto,
      });

      return res.status(200).json(data);
    } catch (e: any) {
      return res.status(e.code).json({ error: e.message });
    }
  }

  async remove(
    req: Request & {
      params: { userId: string };
    },
    res: any
  ) {
    try {
      const userId = req.params.userId;

      const data = await UserService.remove(userId);

      return res.status(200).json(data);
    } catch (e: any) {
      return res.status(e.code).json({ error: e.message });
    }
  }
}
