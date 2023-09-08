import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorators';

@Controller('users')
export class UserController {
  // guards are like an access door => if you have a key you can pass it
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getUserProfile(@GetUser() user: User) {
    return user;
  }
}
