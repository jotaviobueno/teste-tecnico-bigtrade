import Joi from "joi";
import { CreatePostDto } from "../../Dtos/Post";
import { UpdatePostDto } from "../../Dtos/Post/update-post.dto";

export class PostValidator {
  async create(
    req: Request & {
      createPostDto: CreatePostDto;
      body: CreatePostDto;
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
      title: req.body?.title,
      content: req.body?.content,
      user_id: req.body?.user_id,
      files: (req as any)?.files?.files,
    };

    const schema = Joi.object({
      title: Joi.string().min(2).max(255).required(),
      content: Joi.string().min(2).max(2555).required(),
      user_id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      files: Joi.any().optional(),
    });

    const { error } = schema.validate(body);

    if (error) return res.status(400).json({ data: error.details });

    req.createPostDto = {
      ...body,
    };
    next();
  }

  async update(
    req: Request & {
      updatePostDto: UpdatePostDto;
      body: UpdatePostDto;
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
      title: req.body?.title,
      content: req.body?.content,
      user_id: req.body?.user_id,
      files: (req as any)?.files?.files,
    };

    const schema = Joi.object({
      title: Joi.string().min(2).max(255).optional(),
      content: Joi.string().min(2).max(2555).optional(),
      user_id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional(),
      files: Joi.any().optional(),
    });

    const { error } = schema.validate(body);

    if (error) return res.status(400).json({ data: error.details });

    req.updatePostDto = {
      ...body,
    };
    next();
  }
}
