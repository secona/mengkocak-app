import { Injectable } from '@nestjs/common';
import { Joke, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JokesService {
  constructor(private prisma: PrismaService) {}

  async getJokes(): Promise<Joke[]> {
    return this.prisma.joke.findMany();
  }

  async getJoke(jokeId: string): Promise<Joke> {
    return this.prisma.joke.findUnique({ where: { id: jokeId } });
  }

  async newJoke(joke: string, userId: string): Promise<Joke> {
    return this.prisma.joke.create({
      data: {
        joke,
        author: {
          connect: { id: userId },
        },
      },
    });
  }

  async updateJoke(
    jokeId: string,
    data: Prisma.JokeUpdateInput,
  ): Promise<Joke> {
    return this.prisma.joke.update({
      where: { id: jokeId },
      data,
    });
  }

  async deleteJoke(jokeId: string) {
    await this.prisma.joke.delete({
      where: { id: jokeId },
    });
  }
}
