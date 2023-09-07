import { Module, Global } from '@nestjs/common';
import { PrismaConnectService } from './prisma-connect.service';
import { PrismaConnectController } from './prisma-connect.controller';

@Global()
@Module({
  providers: [PrismaConnectService],
  controllers: [PrismaConnectController],
  exports: [PrismaConnectService],
})
export class PrismaConnectModule {}
