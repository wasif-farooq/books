import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Token {
  constructor(token: string) {
    this.token = token;
    this.creationDate = new Date();
  }
  token: string;
  creationDate: Date;
}
@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  firstName: string;
  @Prop()
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;


  @Prop()
  isDeleted: Boolean;
  @Prop()
  loginDates: Token[];
  @Prop()
  resetPasswordToken: Token;
}

export const UserSchema = SchemaFactory.createForClass(User);
