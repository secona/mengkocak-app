import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { JokesGuard } from './jokes.guard';

@Controller('jokes')
export class JokesController {
  constructor(private jokesService: JokesService) { };

  @Get()
  getJokes() {
    return this.jokesService.getJokes();
  }

  @Post()
  @UseGuards(AuthGuard)
  newJoke(
    @Body() body: Record<string, any>,
    @Request() req: any,
  ) {
    const joke = body.joke;
    return this.jokesService.newJoke(joke, req.user.id)
  }

  @Patch(":jokeId")
  @UseGuards(AuthGuard, JokesGuard)
  updateJoke(
    @Body() body: Record<string, any>,
    @Param("jokeId") jokeId: string
  ) {
    return this.jokesService.updateJoke(jokeId, {
      joke: body.joke,
    });
  }

  @Delete(":jokeId")
  @UseGuards(AuthGuard, JokesGuard)
  async deleteJoke(
    @Param("jokeId") jokeId: string,
  ) {
    await this.jokesService.deleteJoke(jokeId);
  }
}
