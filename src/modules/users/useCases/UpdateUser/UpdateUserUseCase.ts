import { inject, injectable } from 'tsyringe';
import { IResponseUser } from '@modules/users/dtos/IResponseUser';
import { IRequestUser } from '@modules/users/dtos/UserDTOs';
import { IUserRepository } from '@modules/users/infra/interfaces/IUserRepository';
import { ILogRepository } from '@modules/logs/repositories/ILogRepository';
import { IHashProvider } from '@shared/provider/HashProvider/dtos/IHashPovider';
import AppError from '@shared/errors/AppError';

@injectable()
export default class UpdateUserUseCase {
  constructor(
    @inject('LogRepository')
    private logRepository: ILogRepository,
    @inject('UserRepository')
    private ormRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute(data: IRequestUser, idUser: string): Promise<IResponseUser> {
    const isExists = await this.ormRepository.findByIdUser(`${data.id}`);

    if (!isExists) {
      throw new AppError(`register not found`);
    }

    if (data.password.trim()) {
      data.password = await this.hashProvider.generateHash(data.password);
    }

    await this.logRepository.save({
      users_id: idUser,
      type: 'edit',
      route: 'users',
      text: { old: isExists, new: data },
    });

    return await this.ormRepository.save({
      ...data,
    });
  }
}
