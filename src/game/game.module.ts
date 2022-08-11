import { Module } from '@nestjs/common';
import { RoomModule } from 'src/room/room.module';
 import { GameGateway } from './gateway/game.gateway';

@Module({
  providers: [GameGateway],
  imports:[RoomModule]
})
export class GameModule {}
