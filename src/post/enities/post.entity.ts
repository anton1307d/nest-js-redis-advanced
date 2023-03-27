import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PageType } from './page-type.enum';
import { PageLocale } from './page-locale.enum';
import { History } from '../../history/enities/history.entity';
import { Circle } from './circle.entity';

@Entity()
export class Page {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  link: string;

  @Column({ nullable: true })
  title?: string;

  @Column({
    type: 'enum',
    enum: PageType,
  })
  type: PageType;

  @Column({
    type: 'enum',
    enum: PageLocale,
    default: PageLocale.DE,
  })
  locale: PageLocale;

  @Column()
  outerId: string;

  @ManyToOne(() => Circle, (circle) => circle.pages, { nullable: true })
  circle?: Circle;

  @OneToMany(() => History, (history) => history.page)
  histories: History[];

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
