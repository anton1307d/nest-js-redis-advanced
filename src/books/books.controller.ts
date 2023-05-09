import {Controller, Get} from '@nestjs/common';
import {BooksService} from "./books.service";

@Controller('books')
export class BooksController {
    constructor(public readonly booksService: BooksService) {}

    @Get('/test')
    public async test()
    {
        await this.booksService.createBooksDataSet();
    }

}
