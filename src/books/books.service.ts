import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Book} from "./entities/book.entity";
import { getManager } from 'typeorm';


@Injectable()
export class BooksService {
    @InjectRepository(Book) private repository: Repository<Book>

    public async createBooksDataSet()
    {
        for (let i = 0; i < 2; i++) {
            const categoryId =  (i & 1 ) ? 1 : 2;

            await  this.repository.createQueryBuilder('books')
                .insert()
                .values([{
                    title: `title-${i}`,
                    category_id: categoryId,
                    author: `author-${i}`,
                    year: 1999,
                }]).execute();

        }
    }
}
