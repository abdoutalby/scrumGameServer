import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "src/auth/auth/auth.service";
import { JwtAuthGuard } from "src/auth/utils/jwt.guard";
import { UserService } from "../service/service.service";
import { UserDto } from "../utils/user.dto";

@Controller("users")
export class ControllerController {
  constructor(
    private readonly service: UserService, 
  ) {}

 

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() user: UserDto) {
    return this.service.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":username")
  getByUsername(@Param("username") username: string) {
    return this.service.findByUsername(username);
  }

  @UseGuards(JwtAuthGuard)
  @Get("id/:id")
  getById(@Param("id") id: string) {
    return this.service.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers() {
    return this.service.getAll();
  }
}
