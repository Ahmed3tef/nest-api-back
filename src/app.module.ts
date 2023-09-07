import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaConnectModule } from './prisma-connect/prisma-connect.module';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule, PrismaConnectModule],
  controllers: [AppController],
})
export class AppModule {}
