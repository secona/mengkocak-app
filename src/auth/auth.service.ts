import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { };
  
  async signIn(username: string, password: string): Promise<string> {
    const user = await this.usersService.getUser({ username });

    if (!user) {
      throw new NotFoundException("User does not exist.");
    }

    const success = await bcrypt.compare(password, user.password);

    if (!success) {
      throw new UnauthorizedException("Login failed.");
    }

    return this.createJWT(user.id);
  }

  private createJWT(userId: string): string {
    return this.jwtService.sign({ userId });
  }
}
