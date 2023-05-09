import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity("books")
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  category_id: number;

  @Column()
  title: string;

  @Column()
  year: number;
}
