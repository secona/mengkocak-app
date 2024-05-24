import { IsString } from 'class-validator';

export class CreateJokeDTO {
  @IsString()
  joke: string;
}
