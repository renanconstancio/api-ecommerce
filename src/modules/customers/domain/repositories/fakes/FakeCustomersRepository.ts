import { v4 as uuidv4 } from 'uuid';
import { CustomersEntity } from '@modules/customers/infra/prisma/etities/Customers';
import { ICreateCustomer } from '@modules/customers/domain/dtos/ICreateCustomer';
import { IPaginateCustomer } from '@modules/customers/domain/dtos/IPaginateCustomer';
import { IUpdateCustomer } from '@modules/customers/domain/dtos/IUpdateCustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';

export default class FakeCustomersRepository implements ICustomersRepository {
  private customers: CustomersEntity[] = [];

  async create(data: ICreateCustomer): Promise<CustomersEntity> {
    const customer = {} as CustomersEntity;

    customer.id = uuidv4();
    customer.name = data.name;
    customer.email = data.email;
    customer.cnpj = data.cnpj;
    customer.cpf = data.cpf;
    customer.phone = data.phone;
    customer.password = data.password;

    this.customers.push(customer);

    return customer;
  }

  async update(data: IUpdateCustomer): Promise<CustomersEntity> {
    Object.assign(this.customers, data);

    return data as CustomersEntity;
  }

  async remove(id: string): Promise<void> {
    this.customers.find(loop => loop.id !== id);
    return;
  }

  async findAll(): Promise<IPaginateCustomer> {
    return {
      total: 1,
      per_page: 1,
      current_page: 1,
      data: this.customers,
    };
  }

  async findAllPaginate(): Promise<IPaginateCustomer> {
    const customersPaginate = {
      total: 1,
      per_page: 1,
      current_page: 1,
      data: this.customers,
    };

    return customersPaginate;
  }

  async findByName(name: string): Promise<CustomersEntity | null> {
    const customer = this.customers.find(customer => customer.name === name);
    return customer as CustomersEntity;
  }

  async findById(id: string): Promise<CustomersEntity | null> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer as CustomersEntity;
  }

  async findByEmail(email: string): Promise<CustomersEntity | null> {
    const customer = this.customers.find(customer => customer.email === email);
    return customer as CustomersEntity;
  }
}
