import {
    Body,
    Controller,
    Get,
    Req,
    Post,
    UseGuards
} from '@nestjs/common';
import { BookService } from "../services/book.service";
import {Book} from "../models/book.model";
import {CreateBookDto} from "../dto/create-book.dto";
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'

@Controller('book')
export class BookController {
    constructor(
        private readonly bookService: BookService,
    ) {
    }

    async create(@Body() createBookDto: CreateBookDto, @Req() req: any) {
        return await this.bookService.create(createBookDto);
    }

    @Get('/private')
    @UseGuards(JwtAuthGuard)
    async getPrivate(): Promise<Book[]> {
        return await this.bookService.findAll(true)
    }

    @Get('/public')
    async getPublic(): Promise<Book[]> {
        return await this.bookService.findAll(false)
    }
}