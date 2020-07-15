import { IsNotEmpty, isBoolean } from 'class-validator';
export class CreateBookDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly author: string;

    @IsNotEmpty()
    readonly isPrivate: boolean;
}
