import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@modules/users/infra/interfaces/IUserRepository';
import { IHashProvider } from '@shared/provider/HashProvider/dtos/IHashPovider';
import { IResponseUserAuth } from '@modules/users/dtos/IResponseUserAuth';
import { sign } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import auth from '@config/auth';

@injectable()
export default class LoginUserUseCase {
  constructor(
    @inject('UserRepository')
    private ormRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute(data: {
    password: string;
    email: string;
  }): Promise<IResponseUserAuth> {
    const respUser = await this.ormRepository.findByEmailUser(data.email);

    if (!data.email || !data.password) {
      throw new AppError(`This is email and password required`, 422);
    }

    if (!respUser) {
      throw new AppError(`This is not user`);
    }

    const passwordConfirmed = await this.hashProvider.compareHash(
      data.password,
      respUser?.password,
    );

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
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
