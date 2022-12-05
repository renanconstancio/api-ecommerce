import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@modules/users/infra/interfaces/IUserRepository';
import AppError from '@shared/errors/appError';

@injectable()
export default class DeleteUserUseCase {
  constructor(
    // @inject('LogRepository')
    // private logRepository: ILogRepository,
    @inject('UserRepository')
    private ormRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const isExists = await this.ormRepository.findByIdUser(id);

    if (!isExists) {
      throw new AppError(`registro não encontrado!`);
    }

    // await this.logRepository.save({
    //   users_id: idUser,
    //   type: 'remove',
    //   route: 'users',
    //   text: isExists,
    // });

    await this.ormRepository.remove(id);
  }
}
