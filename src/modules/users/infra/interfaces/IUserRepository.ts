import { UserDTOs } from '@modules/users/dtos/UserDTOs';

export interface IUserRepository {
  save(data: UserDTOs): Promise<UserDTOs>;
  remove(id: string): Promise<void>;
  findByEmailUser(string: string): Promise<UserDTOs | null>;
  findByIdUser(id: string): Promise<UserDTOs | null>;
  findAllUsers(): Promise<UserDTOs[]>;
}
