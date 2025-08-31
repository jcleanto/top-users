import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, senha: string): Promise<any> {
    console.log(`[AuthService] validateUser: email=${email}, senha=${senha}`)
    return await this.userService.validateUser(email, senha);
  }

  async login(user: any) {
    console.log(`[AuthService] login: user=${JSON.stringify(user)}`)
    const payload = { email: user.email, name: user.nome };
    return {
      access_token: this.jwtService.sign(payload),
      id: user.id,
      email: user.email,
      name: user.nome,
      role: user.role
    };
  }
}
