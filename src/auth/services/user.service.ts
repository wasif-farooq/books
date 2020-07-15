import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailAlreadyExists } from '../exceptions/email-already-exists.exception';
import { ConfigService } from '@nestjs/config';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private configService: ConfigService,
  ) { }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<User> {
    debugger;
    const createdUser = new this.userModel(createUserDto);
    const emailExists = await this.findOneByEmail(createdUser.email);

    if (emailExists) {
      throw new EmailAlreadyExists('email already exists');
    }

    createdUser.password = await this.encryptPassword(createdUser.password);
    const user = await createdUser.save();
    user.password = '';
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findOneByEmail(email: string): Promise<User> {
    return this.userModel
      .findOne({ email: email })
      .exec();
  }

  async encryptPassword(password: string): Promise<string> {
    const saltFactor = this.configService.get('SALT_WORK_FACTOR');
    if (!saltFactor) {
      throw new Error('salt is empty');
    }
    const factor = parseInt(saltFactor);
    const salt = await bcrypt.genSalt(factor);
    return bcrypt.hash(password, salt);
  }
}
