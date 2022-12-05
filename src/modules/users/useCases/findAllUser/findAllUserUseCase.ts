import { inject, injectable } from 'tsyringe';
import { IResponseUser } from '@modules/users/dtos/IResponseUser';
import { IUserRepository } from '@modules/users/infra/interfaces/IUserRepository';

@injectable()
export default class FindAllUserUseCase {
  constructor(
    @inject('UserRepository')
    private ormRepository: IUserRepository,
  ) {}

  async execute(): Promise<IResponseUser[] | null> {
    return await this.ormRepository.findAllUsers();
  }
}
