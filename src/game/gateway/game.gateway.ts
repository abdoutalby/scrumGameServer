import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { RoomService } from "src/room/service/service.service";
import { Room } from "src/room/utils/room.interface";

@WebSocketGateway({
  cors: { origin: ["http://localhost:4200"] },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private Service: RoomService) {}

  handleDisconnect(client: any) {
    console.log("disconnected to socket");
  }
  handleConnection(client: any, ...args: any[]) {
    console.log("connected to socket");
  }
  @SubscribeMessage("sendMessage")
  handleMessage(client: Socket, message: string) {
    this.server.emit("newMessage", message);
  }

  @SubscribeMessage("joinRoom")
  async join(client: Socket, data: { user: any; room: string }) {
    client.join(data.room);
    await this.Service.joinRoom(data.user.username, data.room);
    this.server
      .to(data.room)
      .emit("userJoinedRoom", { id: client.id, room: data.room });
  }
  @SubscribeMessage("userLeaveRoom")
  async leave(client: Socket, data: any) {
    client.leave(data.room);
    await this.Service.leaveRoom(data.user.username, data.room);
    this.server
      .to(data.room)
      .emit("userLeftRoom", { client: client.id, room: data.room });
  }
  


  @SubscribeMessage("onScoreUp")
  async scoreUp(client : Socket ,msg : {roomId , player}) {
    const room = await this.Service.getOne(msg.roomId);
     const player =  room.players.find(p => p.username === msg.player);
      console.log(room  , "hedhy lgiineeha ") ;
      console.log("player " , player)
      this.server.emit("scoreUp" , msg);
    }

  @SubscribeMessage("startGame")
  async startGame(client: Socket, room: any) {
    this.server.to(room).emit("gameStarted");
    const r: Room = await this.Service.getOne(room);
    let d: number = Number(r.duration);
    setTimeout(() => {
      this.server.to(room).emit("GameOver");
    }, d * 60000);
  }

  gameOver(data: string) {
    this.server.to(data).emit("GameOver");
  }
}
