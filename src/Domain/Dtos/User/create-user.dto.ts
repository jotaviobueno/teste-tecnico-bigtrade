export interface CreateUserDto {
  name: string;
  username: string;
  email: string;
  password: string;

  avatar?: string;
}
