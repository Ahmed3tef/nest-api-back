import { Injectable, ForbiddenException } from '@nestjs/common';
import { LoginDto, SignupDto } from './dtos';
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
  async signin(dto: LoginDto) {
    // 1- find user with email
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // 2- if user not found, throw exception
    if (!user) {
      throw new ForbiddenException('User not found');
    }
    // 3- compoare password with hashed password
    const pwMatches = await argon.verify(user.password, dto.password);

    // 4- if password incorrect, throw exception
    if (!pwMatches) {
      throw new ForbiddenException('Password incorrect');
    }

    // 5- if all ok, login user
    delete user.password;
    return user;
  }
}
