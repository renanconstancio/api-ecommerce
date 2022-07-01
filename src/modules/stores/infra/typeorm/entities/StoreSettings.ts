import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 155 })
  keywords: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 65, nullable: true })
  logo_store: string;

  @Column({ type: 'varchar', length: 65, nullable: true })
  logo_store_mobile: string;

  @Column({ type: 'varchar', length: 65, nullable: true })
  logo_store_icon: string;

  @Column({ type: 'varchar', length: 20 })
  google_tag_manager: string;

  @Column({ type: 'varchar', length: 20 })
  google_tag_analytics: string;

  @Column({ type: 'varchar', length: 45 })
  google_tag_verification: string;

  @Column({ type: 'varchar', length: 255 })
  fb_link: string;

  @Column({ type: 'varchar', length: 55 })
  fb_id: string;

  @Column({ type: 'varchar', length: 55 })
  fb_verification: string;

  @Column({ type: 'varchar', length: 255 })
  insta_link: string;

  @Column({ type: 'varchar', length: 55 })
  insta_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleated_at: Date;
}

export default Product;
