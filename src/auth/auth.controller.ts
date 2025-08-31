import { Controller, Get, Request, Response, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { LocalAuthGuard } from './guards/local.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log(`[AuthController] login`)
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard) // - TODO: commented as the authentication flow is still not finished
  @Get('users/me')
  async getMeHandler(@Request() req) {
    console.log(`[AuthController] getMeHandler`)
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(`[AuthController] getProfile`)
    return req.user;
  }

  @Get('logout')
  async logout(@Response() res) {
    console.log(`[AuthController] logout`)
    res.cookie('access_token', '', { maxAge: 1 });
    res.cookie('refresh_token', '', { maxAge: 1 });
    res.cookie('logged_in', '', { maxAge: 1 });
    return res.status(200).json({
      status: 'success',
    });
  }
}