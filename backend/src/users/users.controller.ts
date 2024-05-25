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
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { PaginationInput } from 'src/common/option/pagination.option';
import { PaginationMetaDTO } from 'src/common/dto/pagination-meta.dto';
import { PaginationLinksDTO } from 'src/common/dto/pagination-links.dto';
import { Request } from 'express';
import { UserEntity } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get('profile')
  @UseGuards(AuthGuard)
  getLoggedInUser(@Req() req: Request) {
    return {
      record: new UserEntity(req['user']),
    }
  }

  @Patch('profile')
  @UseGuards(AuthGuard)
  async updateUser(
    @Req() req: Request,
    @Body() data: UpdateUserDTO,
  ) {
    const userId = req['user'].id;

    const user = await this.usersService.updateUser(userId, data);

    return {
      record: new UserEntity(user),
    };
  }

  @Delete('profile')
  @UseGuards(AuthGuard)
  async deleteUser(@Req() req: any) {
    const userId = req.user.id;

    await this.usersService.deleteUser({ id: userId });
  }

  @Get()
  async getUsers(
    @Req() req: Request,
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 0,
    @Query('pageSize', new ParseIntPipe({ optional: true }))
    pageSize: number = 10,
  ) {
    const [count, users] = await this.usersService.getUsers(
      PaginationInput.fromPageFormat(page, pageSize),
    );

    const paginationMeta = new PaginationMetaDTO(page, pageSize, count);

    return {
      meta: paginationMeta,
      links: new PaginationLinksDTO(paginationMeta, req.path, count),
      records: UserEntity.fromPrismaUsers(users),
    }
  }

  @Get(':userId')
  async getUser(
    @Param('userId') userId: string,
    @Query('jokes', new ParseBoolPipe({ optional: true })) withJokes: boolean,
  ) {
    const user = await this.usersService.getUser({ id: userId }, withJokes);

    if (user == null) {
      throw new NotFoundException('User with ID ' + userId + ' not found.');
    }

    return {
      record: new UserEntity(user),
    };
  }

  @Post()
  async createUser(@Body() data: CreateUserDTO) {
    const user = await this.usersService.createUser(data).catch((e) => {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(['username already exists']);
        }
      }

      throw new InternalServerErrorException();
    });

    return {
      record: new UserEntity(user),
    };
  }
}
