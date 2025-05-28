import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductOrm } from '../../products/infrastructure/product-orm.entity';

@Entity('categories')
export class CategoryOrm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  color: string;

  @OneToMany(() => ProductOrm, (product) => product.category)
  products: ProductOrm[];
}
