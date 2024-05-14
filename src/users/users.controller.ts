import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {};

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Post()
  async createUser(@Body() data: Record<string, any>): Promise<User> {
    return this.usersService.createUser({
      name: data.name,
      username: data.username,
      password: data.password,
    })
  }
}
