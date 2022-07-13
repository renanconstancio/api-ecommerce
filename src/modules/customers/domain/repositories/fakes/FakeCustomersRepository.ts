import { v4 as uuidv4 } from 'uuid';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICustomerPaginate } from '../../models/ICustomerPaginate';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  async create({
    name,
    email,
    cnpj,
    cpf,
    phone,
    password,
  }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;
    customer.cnpj = cnpj;
    customer.cpf = cpf;
    customer.phone = phone;
    customer.password = password;

    this.customers.push(customer);

    return customer;
  }

  async save(customer: Customer): Promise<Customer> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    );

    this.customers[findIndex] = customer;

    return customer;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async remove(id: string): Promise<void> {}

  async findAll(): Promise<ICustomerPaginate> {
    return {
      total: 1,
      per_page: 1,
      current_page: 1,
      data: this.customers,
    };
  }

  async findAllPaginate(): Promise<ICustomerPaginate> {
    const customersPaginate = {
      total: 1,
      per_page: 1,
      current_page: 1,
      data: this.customers,
    };

    return customersPaginate;
  }

  async findByName(name: string): Promise<Customer | null> {
    const customer = this.customers.find(customer => customer.name === name);
    return customer as Customer;
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer as Customer;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.customers.find(customer => customer.email === email);
    return customer as Customer;
  }
}

export default FakeCustomersRepository;
