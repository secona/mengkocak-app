import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { AuthGuard } from 'src/auth/auth.guard';

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
}
