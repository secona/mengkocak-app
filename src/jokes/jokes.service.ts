import { Injectable } from '@nestjs/common';
import { Joke } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JokesService {
  constructor(private prisma: PrismaService) { };

  async getJokes(): Promise<Joke[]> {
    return this.prisma.joke.findMany();
  }

  async newJoke(joke: string, userId: string): Promise<Joke> {
    return this.prisma.joke.create({
      data: {
        joke,
        author: {
          connect: { id: userId }
        }
      }
    })
  }
}
