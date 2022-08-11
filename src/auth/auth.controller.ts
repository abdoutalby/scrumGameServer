import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller('auth')
export class AuthController {


    constructor (private readonly authService : AuthService){
    }

    @UseGuards(AuthGuard("local"))
    @Post("login")
    async login(@Body() user : any) {
      return this.authService.loginWithCredentials(user);
    }
}
