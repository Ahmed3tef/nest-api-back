import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})], // we will leave this without inputs and we will add it in the service
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
