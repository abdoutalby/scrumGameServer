import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/utils/jwt.guard";
import { RoomService } from "../service/service.service";
import { RoomDto } from "../utils/room.dto";

@Controller("rooms")
export class ControllerController {
  constructor(private readonly service: RoomService) {}


  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() room : RoomDto){
    return this.service.create(room);
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(){
    return this.service.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  delete(@Param('id') id : string ){
    return this.service.delete(id);
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id')id : string ){
      return this.service.getOne(id);
  }


  @Get('/players/:id')
  async getPlayers(@Param('id')id : string ){
      return this.service.getPlayers(id);
  }
}
