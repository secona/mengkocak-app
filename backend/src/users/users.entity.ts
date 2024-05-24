import { User as PrismaUser } from "@prisma/client";
import { Exclude } from "class-transformer";

export class UserEntity implements PrismaUser {
  id: string;
  name: string;
  username: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  static fromPrismaUsers(users: PrismaUser[]) {
    return users.map(u => new UserEntity(u));
  }
}
