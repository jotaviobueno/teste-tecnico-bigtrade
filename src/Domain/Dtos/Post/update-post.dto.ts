import { CreatePostDto } from "./create-post.dto";

export interface UpdatePostDto extends Partial<CreatePostDto> {}
