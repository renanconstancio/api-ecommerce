import { v4 as uuidv4 } from 'uuid';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import { IPaginateUser } from '../../models/IPaginateUser';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = new User();

    user.id = uuidv4();
    user.name = name;
    user.email = email;
    user.password = password;

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async remove(user: User): Promise<void> {}

  public async findAll(): Promise<IPaginateUser> {
    return {} as IPaginateUser;
  }

  public async findAllPaginate(): Promise<IPaginateUser> {
    const usersPaginate = {
      from: 1,
      to: 1,
      per_page: 1,
      total: 1,
      current_page: 1,
      prev_page: null,
      next_page: null,
      data: this.users,
    };

    return usersPaginate;
  }

  public async findByName(name: string): Promise<User | null> {
    const user = this.users.find(user => user.name === name);
    return user as User;
  }

  public async findById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id);
    return user as User;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email);
    return user as User;
  }
}

export default FakeUsersRepository;
