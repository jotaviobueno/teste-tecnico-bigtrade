import { CreatePostDto } from "../../Domain/Dtos";
import { UpdatePostDto } from "../../Domain/Dtos/Post/update-post.dto";
import PostService from "../Services/PostService";

export class PostController {
  async create(
    { createPostDto }: Request & { createPostDto: CreatePostDto },
    res: any
  ) {
    try {
      const data = await PostService.create(createPostDto);

      return res.status(201).json(data);
    } catch (e: any) {
      console.log(e);
      return res.status(e.code).json({ error: e.message });
    }
  }

  async findById(req: Request & { params: { postId: string } }, res: any) {
    try {
      const postId = req.params.postId;

      const data = await PostService.findById(postId);

      return res.status(200).json(data);
    } catch (e: any) {
      return res.status(e.code).json({ error: e.message });
    }
  }

  async findAll(_: Request, res: any) {
    const data = await PostService.findAll();

    return res.status(200).json(data);
  }

  async update(
    req: Request & {
      params: { postId: string };
      updatePostDto: UpdatePostDto;
    },
    res: any
  ) {
    try {
      const postId = req.params.postId;
      const updatePostDto = req.updatePostDto;

      const data = await PostService.update({
        id: postId,
        ...updatePostDto,
      });

      return res.status(200).json(data);
    } catch (e: any) {
      return res.status(e.code).json({ error: e.message });
    }
  }

  async remove(
    req: Request & {
      params: { postId: string };
    },
    res: any
  ) {
    try {
      const postId = req.params.postId;

      const data = await PostService.remove(postId);

      return res.status(200).json(data);
    } catch (e: any) {
      return res.status(e.code).json({ error: e.message });
    }
  }
}
