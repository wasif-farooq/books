import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { LoginDto } from '../../dto/login.dto';
import { AuthService } from '../../services/auth.service';
import { EmailAlreadyExists } from '../../exceptions/email-already-exists.exception';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Req() req: any) {
    try {
      const currentUser = req.body;
      await this.userService.create(createUserDto);
      const token = await this.authService.authenticate(
        createUserDto.email,
        createUserDto.password,
      );
      if (!!token) {
        return token;
      }
    } catch (error) {
      if (error instanceof EmailAlreadyExists) {
        throw new HttpException('Email Already Exists', HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.authenticate(
      loginDto.email,
      loginDto.password,
    );
    if (!!user) {
      user.password = '';
      return user;
    }
    throw new HttpException('Bad Credentials', HttpStatus.UNAUTHORIZED);
  }
}
