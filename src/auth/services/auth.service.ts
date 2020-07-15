import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { User, Token } from '../models/user.model';
const bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';
import { UserSessionDto } from '../dto/user-session.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async authenticate(email: string, password: string): Promise<User> {
    let user: User = await this.validateAuthentication(email, password);
    if (!!user) {
      const profile = new UserSessionDto(user);
      const token = this.jwtService.sign(profile.toObject());
      const tokenObject = new Token(token);
      if (!user.loginDates) {
        user.loginDates = [tokenObject];
      } else {
        user.loginDates.push(tokenObject);
      }
      await user.save();
      return user;
    }
    return null;
  }

  async validateAuthentication(
    email: string,
    candidatePassword: string,
  ): Promise<any> {
    const user: User = await this.userService.findOneByEmail(email);

    if (user) {
        const isMatch: boolean = await this.comparePassword(
        user.password,
        candidatePassword,
      );
      if (isMatch) {
        return user;
      }
    }
    return null;
  }
  async comparePassword(
    encryptedPassword: string,
    candidatePassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(candidatePassword, encryptedPassword);
  }
}
