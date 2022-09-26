import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/users/entities/user.entity';

export interface JWTPayload {
  sub: string;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async generateAccessToken(email: string) {
    const user = await this.usersService.findUserByEmail(email);
    const payload: JWTPayload = {
      sub: user._id,
      email: user.email,
      role: user.data.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // async login(user: any) {
  //   const payload = { email: user.email, sub: user._id };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}
