import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorators';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  // guards are like an access door => if you have a key you can pass it
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getUserProfile(@GetUser() user: User) {
    return user;
  }

  @Patch('me')
  editUser(@GetUser('id') userId: number, @Body() dto: UpdateUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
