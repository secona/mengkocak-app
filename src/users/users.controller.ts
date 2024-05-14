import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, User } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

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
    return this.usersService.getUser({ id: userId });
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

      console.log(e);
      throw new InternalServerErrorException();
    });

    return user;
  }

  @Patch()
  @UseGuards(AuthGuard)
  async updateUser(
    @Request() req: any,
    @Body() data: Record<string, any>
  ): Promise<User> {
    const userId = req.user.userId;

    const user = await this.usersService.updateUser(userId, {
      name: data.name,
    });

    return user;
  }

  @Delete()
  @UseGuards(AuthGuard)
  async deleteUser(@Request() req: any) {
    const userId = req.user.userId;

    await this.usersService.deleteUser({ id: userId });
  }
}
