import {   Injectable  } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RoomDto } from "../utils/room.dto";
import { Room } from "../utils/room.interface";
import { v4 as uuid } from 'uuid';
import { get } from "http";
@Injectable()
export class RoomService {
  constructor(
    @InjectModel("Room")
    private readonly Room: Model<Room>
  ) {}

  // create 
  async create(room: RoomDto): Promise<Room> {
    let createdRoom ={
        duration:null,
        nbStage:null,
        owner:null,
        title:null,
        players:[]
    };
    console.log(room )
    createdRoom.duration = room.duration;
    createdRoom.nbStage = room.nbStage;
    createdRoom.owner = room.owner;
    createdRoom.title = room.title;
    createdRoom.players = await this.generateUsers(room.nbPlayers);
    console.log(createdRoom);
    return await this.Room.create(createdRoom);
  }

  //get all 
  async getAll(): Promise<Room[]> {
    return await this.Room.find();
  }
 
  //get By ID
  async getOne( id : string ){
    return await this.Room.findOne({_id : id});
  }

  //delete 
  async delete(id : string ) {
    return await this.Room.findByIdAndDelete(id);
    
  }

  //get players 
  async getPlayers(id : string ){
    const r = await this.getOne(id);
    if(r){
    return r.players;
    }else{
  return 'room not found '
    }
  }

  //joined 
  async joinRoom(user : any , room : string){
      const r = await this.Room.findById(room);
      if(r){
        const u = r.players.filter(p=>p.username === user);
      
        u[0].joined=true 
        return await this.Room.findByIdAndUpdate(room, r);
      }else{
        return 'not found '
      }
  }

    //leave 
    async leaveRoom(user : any , room : string){
      const r = await this.Room.findById(room);
      if(r){
        const u = r.players.filter(p=>p.username === user);
       
        u[0].joined=false 
        return await this.Room.findByIdAndUpdate(room, r);
      }else{
        return 'not found '
      }
  }

  // generate users 
   async generateUsers(number : Number) {
   let Users =[];
    for(let i =0; i<number;i++){
       Users.push({username :'player'+i , password : uuid() , joined : false})     
    }
    return Users;
  }
}
