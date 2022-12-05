import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@modules/users/infra/interfaces/IUserRepository';
import { IResponseUser } from '@modules/users/dtos/IResponseUser';
import AppError from '@shared/errors/AppError';

@injectable()
export default class FindUserUseCase {
  constructor(
    @inject('UserRepository')
    private ormRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<IResponseUser> {
    const isExists = await this.ormRepository.findByIdUser(id);

    if (!isExists) {
      throw new AppError(`register not found`);
    }

    return isExists;
  }
}
