import { In, Repository } from 'typeorm';
import { IStoresRepository } from '@modules/stores/domain/repositories/IStoresRepository';
import Store from '../entities/Store';
import { dataSource } from '@shared/infra/typeorm';
import { ICreateStore } from '@modules/stores/domain/models/ICreateStore';
import { IStorePaginate } from '@modules/stores/domain/models/IStorePaginate';
import { IFindStores } from '@modules/stores/domain/models/IFindStores';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export default class StoresRepository implements IStoresRepository {
  private ormRepository: Repository<Store>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Store);
  }

  public async create({
    title,
    fantasy_name,
    email,
    phone,
    opening_hours,
    address,
    number,
    district,
    complement,
    city,
    state,
    zip_code,
    visible,
  }: ICreateStore): Promise<Store> {
    const store = this.ormRepository.create({
      title,
      fantasy_name,
      email,
      phone,
      opening_hours,
      address,
      number,
      district,
      complement,
      city,
      state,
      zip_code,
      visible,
    });

    await this.ormRepository.save(store);

    return store;
  }

  public async save(store: Store): Promise<Store> {
    await this.ormRepository.save(store);

    return store;
  }

  public async remove(store: Store): Promise<void> {
    await this.ormRepository.remove(store);
  }

  // public async updateStock(stores: IUpdateStockProduct[]): Promise<void> {
  //   await this.ormRepository.save(stores);
  // }

  public async findByFantasyName(fantasy_name: string): Promise<Store | null> {
    const store = this.ormRepository.findOneBy({
      fantasy_name,
    });

    return store;
  }

  public async findById(id: string): Promise<Store | null> {
    const store = this.ormRepository.findOneBy({ id });

    return store;
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IStorePaginate> {
    const [stores, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      total: count,
      per_page: take,
      current_page: page,
      data: stores,
    };

    return result;
  }

  public async findAllByIds(stores: IFindStores[]): Promise<Store[]> {
    const productIds = stores.map(store => store.id);

    const existentStoIFindStores = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });

    return existentStoIFindStores;
  }
}
