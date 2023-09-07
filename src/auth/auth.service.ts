import { Injectable, ForbiddenException } from '@nestjs/common';
import { SignupDto } from './dtos';
import * as argon from 'argon2';
import { PrismaConnectService } from '../prisma-connect/prisma-connect.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaConnectService) {}

  async signup(dto: SignupDto) {
    try {
      // hash password
      const hashPassword: string = await argon.hash(dto.password);
      // create a new user
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashPassword,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });
      // delete hash password from return
      delete user.password;
      // return the new user

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credintials Taken');
        }
        throw error;
      }
    }
  }
  signin() {
    return { msg: 'signin' };
  }
}
