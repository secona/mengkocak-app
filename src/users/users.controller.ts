import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, User } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(':userId')
  async getUser(
    @Param('userId') userId: string,
    @Query('jokes') withJokes: string,
  ): Promise<User> {
    return this.usersService.getUser({ id: userId }, withJokes === 'true');
  }

  @Post()
  async createUser(@Body() data: CreateUserDTO): Promise<User> {
    const user = await this.usersService.createUser(data).catch((e) => {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(['username already exists']);
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
    @Body() data: UpdateUserDTO,
  ): Promise<User> {
    const userId = req.user.id;

    const user = await this.usersService.updateUser(userId, data);

    return user;
  }

  @Delete()
  @UseGuards(AuthGuard)
  async deleteUser(@Request() req: any) {
    const userId = req.user.id;

    await this.usersService.deleteUser({ id: userId });
  }
}
