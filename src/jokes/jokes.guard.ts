import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JokesService } from "./jokes.service";

@Injectable()
export class JokesGuard implements CanActivate {
  constructor(private jokesService: JokesService) { };

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const joke = await this.jokesService.getJoke(request.params.jokeId);
    if (joke.authorId != request['user'].id) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
