import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dtos';
import { PrismaConnectService } from '../prisma-connect/prisma-connect.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaConnectService) {}
  async editUser(userId: number, dto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { ...dto },
    });
    delete user.password;
    return user;
  }
}
