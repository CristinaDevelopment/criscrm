import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { DataUser, User } from '../user/entities/user.model';

export interface UserI {
  _id: string;
  data: DataUser;
}
export interface TokenPayload {
  userId: string;
  name: string;
  role: string;
  image: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserI, response: Response) {
    const { _id, data } = user;
    const tokenPayload: TokenPayload = {
      userId: _id,
      name: data.name,
      role: data.role,
      image: data.image,
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}
