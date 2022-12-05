import { UserDTOs } from '@modules/users/dtos/UserDTOs';
import { IUserRepository } from '@modules/users/infra/interfaces/IUserRepository';
import { prisma } from '@shared/infra/prisma';

export default class UserRepository implements IUserRepository {
  async save(data: UserDTOs): Promise<UserDTOs> {
    if (data.id)
      return await prisma.users.update({
        where: {
          id: data.id,
        },
        data,
        select: {
          id: true,
          type: true,
          email: true,
          first_name: true,
          last_name: true,
          phone: true,
          created_at: true,
          updated_at: true,
          deleted_at: true,
        },
      });

    return await prisma.users.create({
      data,
      select: {
        id: true,
        type: true,
        email: true,
        first_name: true,
        last_name: true,
        phone: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
      },
    });
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
    return await prisma.users.findFirst({
      where: {
        deleted_at: null,
        email: email,
      },
      select: {
        id: true,
        type: true,
        email: true,
        first_name: true,
        last_name: true,
        password: true,
      },
    });
  }

  async findByIdUser(id: string): Promise<UserDTOs | null> {
    return await prisma.users.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        type: true,
        email: true,
        first_name: true,
        last_name: true,
        phone: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
      },
    });
  }

  async findAllUsers(): Promise<UserDTOs[]> {
    return await prisma.users.findMany({
      where: { deleted_at: null },
      orderBy: {
        first_name: 'asc',
      },
      select: {
        id: true,
        type: true,
        email: true,
        first_name: true,
        last_name: true,
        phone: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
      },
    });
  }
}
