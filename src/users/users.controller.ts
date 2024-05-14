import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) { };

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(":userId")
  async getUser(@Param("userId") userId: string): Promise<User> {
    return this.usersService.getUser(userId);
  }

  @Post()
  async createUser(@Body() data: Record<string, any>): Promise<User> {
    const user = await this.usersService.createUser({
      name: data.name,
      username: data.username,
      password: data.password,
    }).catch(e => {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          throw new BadRequestException("User with the same username already exists.");
        }
      }

      throw new InternalServerErrorException();
    });

    return user;
  }

  @Patch(":userId")
  async updateUser(
    @Param("userId") userId: string,
    @Body() data: Record<string, any>
  ): Promise<User> {
    const user = await this.usersService.updateUser(userId, {
      name: data.name,
    });

    return user;
  }

  // TODO
  // @Delete(":userId")
  // async deleteUser(@Param("userId") userId: string) {
  //   this.usersService.deleteUser(userId);
  // }
}
