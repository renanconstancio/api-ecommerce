import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@modules/users/infra/interfaces/IUserRepository';
import { IBcryptHashProvider } from '@shared/container/providers/hashProvider/interfaces/IBcryptHashProvider';
import { UserAuthDTOs } from '@modules/users/dtos/userAuthDTOs';
import { sign } from 'jsonwebtoken';
import AppError from '@shared/errors/appError';
import auth from '@config/auth';

@injectable()
export default class LoginUserUseCase {
  constructor(
    @inject('UserRepository')
    private ormRepository: IUserRepository,
    @inject('BcryptHashProvider')
    private hashProvider: IBcryptHashProvider,
  ) {}

  async execute(data: {
    password: string;
    email: string;
  }): Promise<UserAuthDTOs> {
    const respUser = await this.ormRepository.findByEmailUser(data.email);

    if (!data.email || !data.password) {
      throw new AppError(`E-mail e senha são obrigatórios!`, 422);
    }

    if (!respUser) {
      throw new AppError(`Esse usuário não existe!`);
    }

    const passwordConfirmed = await this.hashProvider.compareHash(
      data.password,
      `${respUser?.password}`,
    );

    if (!passwordConfirmed) {
      throw new AppError('Combinação incorreta de email/password.', 422);
    }

    const token = sign({}, auth.jwt.secret, {
      subject: respUser.id,
      expiresIn: auth.jwt.expiresIn,
    });

    return {
      user: {
        id: respUser.id,
        type: respUser.type,
        email: respUser.email,
        first_name: respUser.first_name || '',
        last_name: respUser.last_name || '',
      },
      token,
    };
  }
}
