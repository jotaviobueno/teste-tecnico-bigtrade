import Joi from "joi";
import { CreateUserDto, UpdateUserDto } from "../../Dtos/index.js";
import bcrypt from "bcrypt";

export class UserValidator {
  async create(
    req: Request & {
      createUserDto: CreateUserDto;
      body: CreateUserDto;
    },
    res: Response & {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { data: Joi.ValidationErrorItem[] }): any; new (): any };
      };
    },
    next: () => void
  ) {
    const body = {
      name: req.body?.name,
      username: req.body?.username,
      email: req.body?.email,
      password: req.body?.password,
      file: (req as any)?.files?.file,
    };

    const schema = Joi.object({
      name: Joi.string().min(2).max(255).required(),
      username: Joi.string().min(2).max(55).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      file: Joi.any().optional(),
    });

    const { error } = schema.validate(body);

    if (error) return res.status(400).json({ data: error.details });

    body.password = await bcrypt.hash(body.password, 10);

    req.createUserDto = {
      ...body,
    };
    next();
  }

  async update(
    req: Request & {
      updateUserDto: UpdateUserDto;
      body: UpdateUserDto;
    },
    res: Response & {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { data: Joi.ValidationErrorItem[] }): any; new (): any };
      };
    },
    next: () => void
  ) {
    const body = {
      name: req.body?.name,
      username: req.body?.username,
      email: req.body?.email,
      password: req.body?.password,
      file: (req as any)?.files?.file,
    };

    const schema = Joi.object({
      name: Joi.string().min(2).max(255).optional(),
      username: Joi.string().min(2).max(55).optional(),
      email: Joi.string().email().optional(),
      password: Joi.string().min(6).optional(),
      file: Joi.any().optional(),
    });

    const { error } = schema.validate(body);

    if (error) return res.status(400).json({ data: error.details });

    if (body.password) body.password = await bcrypt.hash(body.password, 10);

    req.updateUserDto = {
      ...body,
    };
    next();
  }
}
