import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  ) {
    const [count, jokes] = await this.jokesService.getJokes(
      userId,
      PaginationInput.fromPageFormat(page, pageSize),
    );

    const paginationMeta = new PaginationMetaDTO(page, pageSize, count);

    return {
      meta: paginationMeta,
      links: new PaginationLinksDTO(paginationMeta, req.path),
      records: jokes,
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  async createJoke(@Body() body: CreateJokeDTO, @Req() req: any) {
    return this.jokesService.newJoke(body.joke, req.user.id);
  }

  @Patch(':jokeId')
  @UseGuards(AuthGuard, JokesGuard)
  async updateJoke(
    @Body() data: UpdateJokeDTO,
    @Param('jokeId') jokeId: string,
  ) {
    return this.jokesService.updateJoke(jokeId, data);
  }

  @Delete(':jokeId')
  @UseGuards(AuthGuard, JokesGuard)
  async deleteJoke(@Param('jokeId') jokeId: string) {
    await this.jokesService.deleteJoke(jokeId);
  }
}
