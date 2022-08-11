import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ControllerController } from './controller/controller.controller';
 import { RoomService } from './service/service.service';
import { RoomSchema } from './utils/shcema';
 
@Module({
  imports:[MongooseModule.forFeature([{name:'Room' , schema: RoomSchema}])],
  providers: [ RoomService],
  controllers: [ ControllerController],
  exports:[RoomService]

})
export class RoomModule {}
