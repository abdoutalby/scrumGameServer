import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth/auth.service'; 
import { jwtConstants } from './utils/key';
import { JwtModule } from '@nestjs/jwt'; 
import { LocalStrategy } from './utils/local.strategy';
import { JwtStrategy } from './utils/jwt.strategy';




@Module({
  imports : [UsersModule ,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '60s'}
    }) ],
  controllers: [AuthController],
  providers: [AuthService , LocalStrategy , JwtStrategy]
})
export class AuthModule {}
