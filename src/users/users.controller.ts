import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
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

  @Get("profile")
  @UseGuards(AuthGuard)
  getLoggedInUser(@Request() req: any): User {
    return req.user;
  }

  @Patch("profile")
  @UseGuards(AuthGuard)
  async updateUser(
    @Request() req: any,
    @Body() data: UpdateUserDTO,
  ): Promise<User> {
    const userId = req.user.id;

    const user = await this.usersService.updateUser(userId, data);

    return user;
  }

  @Delete("profile")
  @UseGuards(AuthGuard)
  async deleteUser(@Request() req: any) {
    const userId = req.user.id;

    await this.usersService.deleteUser({ id: userId });
  }

  @Get()
  async getUsers(
    @Query('take', new ParseIntPipe({ optional: true })) take?: number,
    @Query('skip', new ParseIntPipe({ optional: true })) skip?: number,
  ): Promise<User[]> {
    return this.usersService.getUsers(take, skip);
  }

  @Get(':userId')
  async getUser(
    @Param('userId') userId: string,
    @Query('jokes', new ParseBoolPipe({ optional: true })) withJokes: boolean,
  ): Promise<User> {
    const user = await this.usersService.getUser({ id: userId }, withJokes);

    if (user == null) {
      throw new NotFoundException("User with ID " + userId + " not found.");
    }

    return user;
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
}
