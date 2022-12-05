import { inject, injectable } from 'tsyringe';
import { UserDTOs } from '@modules/users/dtos/userDTOs';
import { IUserRepository } from '@modules/users/infra/interfaces/IUserRepository';
import { IBcryptHashPovider } from '@shared/container/providers/hashProvider/interfaces/IBcryptHashProvider';
import AppError from '@shared/errors/appError';

@injectable()
export default class PatchUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('BcryptHashProvider')
    private hashProvider: IBcryptHashPovider,
  ) {}

  async execute(data: UserDTOs): Promise<UserDTOs> {
    const isExists = await this.userRepository.findByEmailUser(data.email);

    if ((!data.email || !data.password) && !isExists?.id) {
      throw new AppError(`Os campos e-mail e senha são obrigatórios!`, 422);
    }

    if (
      (isExists && !data.id) ||
      (isExists && `${isExists?.id}` !== `${data.id}`)
    ) {
      throw new AppError(`Esse e-mail ${isExists.email} já existe!`);
    }

    if (data.password) {
      const hashedPassword = await this.hashProvider.generateHash(
        data.password,
      );

      data = {
        ...data,
        password: hashedPassword,
      };
    }

    // await this.logRepository.save({
    //   users_id: id,
    //   type: 'register',
    //   route: 'users',
    //   text: { old: isExists, new: data },
    // });

    return await this.userRepository.save({
      ...data,
    });
  }
}
