import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JokesService } from './jokes.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { JokesGuard } from './jokes.guard';
import { CreateJokeDTO } from './dto/create-joke.dto';
import { UpdateJokeDTO } from './dto/update-joke.dto';
import { PaginationInput } from 'src/common/option/pagination.option';
import { PaginationMetaDTO } from 'src/common/dto/pagination-meta.dto';
import { Request } from 'express';
import { PaginationLinksDTO } from 'src/common/dto/pagination-links.dto';
import { UserEntity } from 'src/users/users.entity';

@Controller('jokes')
export class JokesController {
  constructor(private jokesService: JokesService) { }

  @Get()
  async getJokes(
    @Req() req: Request,
    @Query('userId') userId?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 0,
    @Query('pageSize', new ParseIntPipe({ optional: true }))
    pageSize: number = 10,
    @Query('withUser', new ParseBoolPipe({ optional: true })) withUser: boolean = false,
  ) {
    const [count, jokes] = await this.jokesService.getJokes(
      userId,
      PaginationInput.fromPageFormat(page, pageSize),
      withUser,
    );

    const paginationMeta = new PaginationMetaDTO(page, pageSize, count);

    jokes.forEach(joke => {
      if (joke['author']) {
        joke['author'] = new UserEntity(joke['author']);
      }
    });

    return {
      meta: paginationMeta,
      links: new PaginationLinksDTO(paginationMeta, req.path),
      records: jokes,
    }
  }

  @Get(":jokeId")
  async getJoke(@Param("jokeId") jokeId: string) {
    const joke = await this.jokesService.getJoke(jokeId);
    return {
      record: joke,
    };
  }

  @Post()
  @UseGuards(AuthGuard)
  async createJoke(@Body() body: CreateJokeDTO, @Req() req: any) {
    const joke = await this.jokesService.newJoke(body.joke, req.user.id);
    return {
      record: joke,
    }
  }

  @Patch(':jokeId')
  @UseGuards(AuthGuard, JokesGuard)
  async updateJoke(
    @Body() data: UpdateJokeDTO,
    @Param('jokeId') jokeId: string,
  ) {
    const joke = await this.jokesService.updateJoke(jokeId, data);
    return {
      record: joke,
    };
  }

  @Delete(':jokeId')
  @UseGuards(AuthGuard, JokesGuard)
  async deleteJoke(@Param('jokeId') jokeId: string) {
    await this.jokesService.deleteJoke(jokeId);
  }
}
