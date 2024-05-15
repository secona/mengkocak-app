import { IsString, Length } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsString()
  @Length(3)
  username: string;

  @IsString()
  @Length(8)
  password: string;
}
