// import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  // OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export default class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // @OneToMany(() => OrdersProducts, order_products => order_products.product)
  // order_products: OrdersProducts[];

  @Column({ type: 'varchar', length: 20 })
  sku!: string;

  @Column({ type: 'varchar', length: 155 })
  name!: string;

  @Column('decimal')
  price!: number;

  @Column('int')
  quantity!: number;

  @Column({ type: 'text' })
  description!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}
