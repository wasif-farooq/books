import { User } from '../models/user.model';

export class UserSessionDto {
  readonly userId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;

  constructor(user: User) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.userId = user._id;
  }
  toJson() {
    return JSON.stringify(this.toObject());
  }
  toObject() {
    return JSON.parse(JSON.stringify(this));
  }
}
