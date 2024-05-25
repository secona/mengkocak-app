import { PaginationOptions, PaginationResponse, Response } from "./common";
import { User } from "./User";

export interface CreateJokeDTO {
  joke: string;
}

export interface UpdateJokeDTO {
  joke: string;
}

export interface GetOneOptions {
  jokes: string;
}

export interface GetManyOptions {
  userId?: string;
  withUser?: string;
}

export class Joke {
  private static JOKES_API_URL = new URL("jokes", process.env.API_URL!);

  id!: string;
  authorId!: string;
  joke!: string;

  author?: User;

  constructor(partial: Partial<Joke>) {
    Object.assign(this, partial);
  }

  static async getMany(options?: PaginationOptions & GetManyOptions): Promise<PaginationResponse<Joke>> {
    const url = new URL(Joke.JOKES_API_URL);
    url.search = new URLSearchParams({ ...options }).toString();

    const res = await fetch(url, {
      next: {
        revalidate: 10,
      },
    });

    return res.json();
  }

  static async getOne(jokeId: string, options?: GetOneOptions): Promise<Response<Joke>> {
    const url = new URL(Joke.JOKES_API_URL);
    url.pathname += "/" + jokeId;
    url.search = new URLSearchParams({ ...options }).toString();

    const res = await fetch(url);
    return res.json();
  }

  static async create(token: string, data: CreateJokeDTO): Promise<Response<Joke>> {
    const res = await fetch(Joke.JOKES_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify(data),
    });

    return res.json();
  }

  static async delete(token: string, jokeId: string) {
    const url = new URL(Joke.JOKES_API_URL);
    url.pathname += "/" + jokeId;

    await fetch(url, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + token,
      }
    });
  }

  static async update(token: string, jokeId: string, data: UpdateJokeDTO): Promise<Response<Joke>> {
    const url = new URL(Joke.JOKES_API_URL);
    url.pathname += "/" + jokeId;

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify(data),
    });

    return res.json();
  }
}
