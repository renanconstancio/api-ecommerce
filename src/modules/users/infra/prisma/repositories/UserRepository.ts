import { UserDTOs } from '@modules/users/dtos/UserDTOs';
import { IUserRepository } from '@modules/users/infra/interfaces/IUserRepository';
import { dateString } from '@shared/utils/functions';
import { prisma } from '@shared/infra/prisma';

export default class UserRepository implements IUserRepository {
  async save(data: UserDTOs): Promise<UserDTOs> {
    if (data.id)
      return (await prisma.users
        .update({
          where: {
            id: data.id,
          },
          data,
        })
        .then(({ ...user }) => ({
          ...user,
          created_at: dateString(user.created_at as Date),
          updated_at: dateString(user.updated_at as Date),
          deleted_at: user.deleted_at && dateString(user.deleted_at as Date),
        }))) as UserDTOs;

    return (await prisma.users
      .create({
        data,
      })
      .then(({ ...user }) => ({
        ...user,
        created_at: dateString(user.created_at as Date),
        updated_at: dateString(user.updated_at as Date),
        deleted_at: user.deleted_at && dateString(user.deleted_at as Date),
      }))) as UserDTOs;
  }

  async remove(id: string): Promise<void> {
    await prisma.users.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });
  }

  async findByEmailUser(email: string): Promise<UserDTOs | null> {
    return (await prisma.users.findFirst({
      where: {
        deleted_at: null,
        email: email,
      },
    })) as UserDTOs;
  }

  async findByIdUser(id: string): Promise<UserDTOs | null> {
    return (await prisma.users.findUnique({
      where: {
        id,
      },
    })) as UserDTOs;
  }

  async findAllUsers(): Promise<UserDTOs[]> {
    return (await prisma.users.findMany({
      where: { deleted_at: null },
      orderBy: {
        first_name: 'asc',
      },
    })) as UserDTOs[];
  }
}
