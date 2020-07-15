import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Book extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    author: string;

    @Prop()
    isPrivate: Boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);
