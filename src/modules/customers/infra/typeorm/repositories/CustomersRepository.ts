import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomerPaginate } from '@modules/customers/domain/models/ICustomerPaginate';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { Repository } from 'typeorm';
import Customer from '../entities/Customer';
import { dataSource } from '@shared/infra/typeorm';
import { SearchParams } from '../../../domain/repositories/ICustomersRepository';

export default class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Customer);
  }

  async create({
    name,
    email,
    cnpj,
    cpf,
    password,
    phone,
    birth_date,
  }: ICreateCustomer): Promise<Customer> {
    const customer = this.ormRepository.create({
      name,
      email,
      cnpj,
      cpf,
      password,
      phone,
      birth_date,
    });

    await this.ormRepository.save(customer);

    return customer;
  }

  async save(customer: Customer): Promise<Customer> {
    await this.ormRepository.save(customer);

    return customer;
  }

  async remove(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }

  async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<ICustomerPaginate> {
    const [customers, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      total: count,
      per_page: take,
      current_page: page,
      data: customers,
    };

    return result;
  }

  async findByName(name: string): Promise<Customer | null> {
    const customer = await this.ormRepository.findOneBy({
      name,
    });

    return customer;
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = await this.ormRepository.findOneBy({
      id,
    });

    return customer;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.ormRepository.findOneBy({
      email,
    });

    return customer;
  }
}
