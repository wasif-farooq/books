import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '../dto/create-book.dto';
import { Book } from '../models/book.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name) private readonly bookModel: Model<Book>
    ) {}

    async create(
        createBookDto: CreateBookDto,
    ): Promise<Book> {
        return await this.bookModel.create(createBookDto)
    }

    async findAll(isPrivate: boolean): Promise<Book[]> {
        return await this.bookModel.find({ isPrivate: isPrivate }).exec();
    }
}