import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JokesService } from './jokes.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { JokesGuard } from './jokes.guard';
import { CreateJokeDTO } from './dto/create-joke.dto';
import { UpdateJokeDTO } from './dto/update-joke.dto';

@Controller('jokes')
export class JokesController {
  constructor(private jokesService: JokesService) {}

  @Get()
  async getJokes() {
    return this.jokesService.getJokes();
  }

  @Post()
  @UseGuards(AuthGuard)
  async createJoke(@Body() body: CreateJokeDTO, @Request() req: any) {
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
