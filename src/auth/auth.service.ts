import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { DataUser, User } from '../user/entities/user.model';

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

  async login(user: User, response: Response) {
    const { _id, data } = user;
    const { name, role, image } = data as DataUser;
    const tokenPayload: TokenPayload = {
      userId: _id,
      name: name,
      role: role,
      image: image,
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

  // async verifyPayload(payload: JwtPayload): Promise<User> {
  //   let user: User;

  //   try {
  //     user = await this.userService.findOne({ where: { email: payload.sub } });
  //   } catch (error) {
  //     throw new UnauthorizedException(
  //       `There isn't any user with email: ${payload.sub}`,
  //     );
  //   }
  //   delete user.password;

  //   return user;
  // }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}
