import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ControllerController } from './controller/controller.controller';
import { UserService } from './service/service.service';
import { UserSchema } from './utils/user.schema';

@Module({
  imports:[ 
    MongooseModule.forFeature([{name:'User' , schema: UserSchema}])],

  controllers: [ControllerController],
  providers: [UserService] ,
  exports : [UserService]
})
export class UsersModule {}
